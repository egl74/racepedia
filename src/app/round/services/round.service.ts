import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
                driverName: `${item.Driver.givenName} ${item.Driver.familyName}`,
                driverNationality: item.Driver.nationality,
                constructorName: item.Constructor.name,
                result: item.Time ? item.Time.time : item.status,
              })
          );
          return race;
        }),
        shareReplay(1)
      );
  }
}
