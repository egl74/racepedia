import { DataSource } from '@angular/cdk/collections';
import { Observable, of as observableOf, merge } from 'rxjs';
import { RaceModel } from '../models/race.model';
import { SeasonService } from '../services/season.service';

/**
 * Data source for the Seasons view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SeasonsDataSource extends DataSource<RaceModel> {
  constructor(private readonly seasonService: SeasonService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RaceModel[]> {
    return this.seasonService.getCurrentSeason();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}
}