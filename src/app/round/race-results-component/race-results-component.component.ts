import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, shareReplay } from 'rxjs/operators';
import { RaceResultsItem } from 'src/app/models/race-results-item.model';
import { RoundService } from 'src/app/round/services/round.service';
import { RaceResultsTableDataSource } from './race-results-table-datasource';
const { flag } = require('country-emoji');

@Component({
  templateUrl: '/race-results-component.component.html',
  styleUrls: ['./race-results-component.component.scss'],
})
export class RaceResultsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RaceResultsItem>;
  dataSource: RaceResultsTableDataSource;
  flag = flag;
  displayedColumns = [
    'position',
    'driverName',
    'constructorName',
    'grid',
    'stops',
    'result',
  ];
  panelOpenState = false;
  race$ =
    this.route.params.pipe(
      mergeMap((params) =>
        this.roundService.getRaceResults(params.season, params.round)
      ),
      shareReplay(1)
    ) || of();

  private data = this.race$.pipe(
    map((race) => race.results),
    catchError(() => of([]))
  );

  constructor(
    readonly roundService: RoundService,
    private readonly route: ActivatedRoute
  ) {
    this.data.subscribe();
  }

  ngOnInit() {
    this.dataSource = new RaceResultsTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
