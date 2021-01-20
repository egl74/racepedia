import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RaceModel } from '../models/race.model';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  private apiUrl = environment.ergastApiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public getAllSeasons() {}

  public getCurrentSeason(): Observable<RaceModel[]> {
    return this.httpClient
      .get(`${this.apiUrl}/current.json`)
      .pipe(map((result: any) => result.MRData.RaceTable.Races));
  }
}
