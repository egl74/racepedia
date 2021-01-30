import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap, shareReplay, tap } from 'rxjs/operators';
import { RoundService } from '../services/round.service';
import { SessionResultsTableDataSource } from './session-results-table/session-results-table-datasource';
import { SessionResultsTableComponent } from './session-results-table/session-results-table.component';

@Component({
  templateUrl: './session-results-table/session-results-table.component.html',
  styleUrls: ['./session-results-table/session-results-table.component.scss'],
})
export class RaceResultsComponent
  extends SessionResultsTableComponent
  implements OnInit, AfterViewInit {
  protected data =
    this.route.params.pipe(
      mergeMap((params) =>
        this.roundService.getRaceResults(params.season, params.round)
      ),
      shareReplay(1)
    ) || of();

  constructor(
    private readonly roundService: RoundService,
    private readonly route: ActivatedRoute
  ) {
    super();
    this.data.subscribe();
  }

  ngOnInit() {
    this.dataSource = new SessionResultsTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
