import { DataSource } from '@angular/cdk/collections';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DriverStandingsItem } from '../../models/driver-standings-item.model';
import { SeasonService } from 'src/app/services/season.service';

// TODO: Replace this with your own data model type
export interface StandingsItem {
  name: string;
  id: number;
}

/**
 * Data source for the Standings view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StandingsDataSource extends DataSource<DriverStandingsItem> {
  seasonPicked: Observable<string>;

  constructor(
    private readonly seasonService: SeasonService,
    seasonPicked: Observable<string>
  ) {
    super();
    this.seasonPicked = seasonPicked;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DriverStandingsItem[]> {
    return this.seasonPicked.pipe(
      switchMap((season) => this.seasonService.getDriverStandings(season))
    );
  }

  disconnect() {}
}
