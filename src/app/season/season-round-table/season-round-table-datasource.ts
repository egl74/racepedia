import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RaceModel } from '../../models/race.model';
import { SeasonService } from '../services/season.service';

/**
 * Data source for the Seasons view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SeasonRoundTableDataSource extends DataSource<RaceModel> {
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
  connect(): Observable<RaceModel[]> {
    return this.seasonPicked.pipe(
      switchMap((season) => this.seasonService.getSeason(season)),
      map((season) => season.Races)
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}
}
