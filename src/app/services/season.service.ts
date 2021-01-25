import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { concatMap, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RaceModel } from '../models/race.model';
import { SeasonModel } from '../models/season.model';

@Injectable({
  providedIn: 'root',
})
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
}
