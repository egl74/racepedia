import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SeasonService } from 'src/app/season/services/season.service';
import { ConstructorStandingsItem } from 'src/app/models/constructor-standings-item.model';

/**
 * Data source for the Standings view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ConstructorStandingsDataSource extends DataSource<ConstructorStandingsItem> {
  season: string;

  constructor(
    private readonly seasonService: SeasonService,
    season: string
  ) {
    super();
    this.season = season;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ConstructorStandingsItem[]> {
    return this.seasonService.getConstructorStandings(this.season);
  }

  disconnect() {}
}
