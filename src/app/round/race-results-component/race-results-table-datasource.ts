import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { RaceResultsItem } from 'src/app/models/session-results-item.model';

/**
 * Data source for the SessionResultsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RaceResultsTableDataSource extends DataSource<RaceResultsItem> {
  constructor(private connectObservable: Observable<RaceResultsItem[]>) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RaceResultsItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return this.connectObservable;
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}
}
