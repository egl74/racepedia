import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SeasonModel } from '../models/season.model';
import { DriverStandingsItem } from '../models/driver-standings-item.model';

@Injectable()
export class SeasonService {
  private apiUrl = environment.ergastApiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public getAllSeasons(): Observable<SeasonModel[]> {
    return this.httpClient.get(`${this.apiUrl}/seasons.json?limit=1`).pipe(
      concatMap((seasons: any) =>
        this.httpClient.get(
          `${this.apiUrl}/seasons.json?limit=${seasons.MRData.total}`
        )
      ),
      map((seasons: any) => seasons.MRData.SeasonTable.Seasons),
      map((seasons: SeasonModel[]) =>
        seasons.sort((a, b) => b.season.localeCompare(a.season))
      ),
      shareReplay(1)
    );
  }

  public getCurrentSeason(): Observable<string> {
    return this.httpClient.get(`${this.apiUrl}/current.json?limit=1`).pipe(
      map((result: any) => result.MRData.RaceTable.season),
      shareReplay(1)
    );
  }

  public getSeason(season: string): Observable<SeasonModel> {
    return this.httpClient
      .get(`${this.apiUrl}/${season}.json`)
      .pipe(map((result: any) => result.MRData.RaceTable));
  }

  public getDriverStandings(season: string): Observable<DriverStandingsItem[]> {
    return this.httpClient
      .get(`${this.apiUrl}/${season}/driverstandings.json`)
      .pipe(
        map(
          (result: any) =>
            result.MRData.StandingsTable.StandingsLists[0].DriverStandings
        ),
        map((standings: any[]) =>
          standings.map(
            (item) =>
              new DriverStandingsItem({
                position: item.position,
                driverCode: item.Driver.code,
                driverId: item.Driver.driverId,
                team: item.Constructors[0]?.name,
                points: item.points,
              })
          )
        )
      );
  }
}
