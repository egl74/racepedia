import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map, mergeMap, shareReplay } from 'rxjs/operators';
import { RaceModel } from 'src/app/models/race.model';
import { environment } from 'src/environments/environment';
import { RaceResultsItem } from '../../models/race-results-item.model';

@Injectable()
export class RoundService {
  private apiUrl = environment.ergastApiUrl;

  constructor(private readonly httpClient: HttpClient) {}
  public getRaceResults(
    season: string,
    round: string,
    limit: number = 30
  ): Observable<RaceModel> {
    return this.httpClient
      .get(`${this.apiUrl}/${season}/${round}/results.json?limit=${limit}`)
      .pipe(
        map((result: any) => result.MRData.RaceTable.Races[0]),
        map((raceItem: any) => {
          const race = new RaceModel(raceItem);
          race.results = raceItem.Results.map(
            (item: any) =>
              new RaceResultsItem({
                position: item.position,
                driverId: item.Driver.driverId,
                driverName: `${item.Driver.givenName} ${item.Driver.familyName}`,
                driverNationality: item.Driver.nationality,
                constructorName: item.Constructor.name,
                result: item.Time ? item.Time.time : item.status,
                grid: item.grid,
                fastestLapRank: item.FastestLap?.rank,
                fastestLapTime: item.FastestLap?.Time.time,
              })
          );
          return race;
        }),
        mergeMap((race) =>
          this.getPitStops(season, round).pipe(
            map((pitStops) => {
              race.results.forEach(
                (item) => (item.stops = pitStops[item.driverId])
              );
              return race;
            })
          )
        ),
        shareReplay(1)
      );
  }

  private getPitStops(season: string, round: string): Observable<any> {
    return this.getStops(season, round).pipe(
      concatMap((stops) => this.getStops(season, round, stops.MRData.total)),
      map((stops) => stops.MRData.RaceTable.Races[0].PitStops),
      shareReplay(1),
      map((stops: any[]) => {
        const pitStops: any = {};
        const drivers = stops
          .map((stop) => stop.driverId)
          .filter((stop, i, array) => array.indexOf(stop) === i);
        drivers.forEach(
          (driver) =>
            (pitStops[driver] = stops.filter(
              (stop) => stop.driverId === driver
            ).length)
        );
        return pitStops;
      })
    );
  }

  private getStops(
    season: string,
    round: string,
    limit: number = 0
  ): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/${season}/${round}/pitstops.json?limit=${limit}`
    );
  }
}
