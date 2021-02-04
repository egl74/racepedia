import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RaceModel } from '../../models/race.model';
import { SeasonService } from '../services/season.service';
import { SeasonRoundTableDataSource } from './season-round-table-datasource';
const { flag } = require('country-emoji');

@Component({
  selector: 'app-season-round-table',
  templateUrl: './season-round-table.component.html',
  styleUrls: ['./season-round-table.component.scss'],
})
export class SeasonRoundTableComponent implements AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RaceModel>;

  dataSource: SeasonRoundTableDataSource;
  flag = flag;

  constructor(
    private readonly seasonService: SeasonService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.dataSource = new SeasonRoundTableDataSource(
      this.seasonService,
      this.route.parent
        ? this.route.parent.params.pipe(map((params) => params['season']))
        : of()
    );
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['round', 'race', 'circuit'];

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }

  switchSeason(year: string) {
    this.router.navigate([`/season/${year}`])
  }
}
