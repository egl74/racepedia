import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SessionResultsItem } from 'src/app/models/session-results-item.model';
import { SessionResultsTableDataSource } from './session-results-table-datasource';
const { flag } = require('country-emoji');

@Component({
  selector: 'app-session-results-table',
  templateUrl: './session-results-table.component.html',
  styleUrls: ['./session-results-table.component.scss'],
})
export class SessionResultsTableComponent {
  @ViewChild(MatTable) table: MatTable<SessionResultsItem>;
  dataSource: SessionResultsTableDataSource;
  protected data: Observable<SessionResultsItem[]>;
  flag = flag;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'driverName', 'constructorName', 'result'];
}
