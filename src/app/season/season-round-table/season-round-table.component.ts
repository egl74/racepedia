import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { RaceModel } from '../../models/race.model';
import { SeasonService } from '../services/season.service';
import { SeasonRoundTableDataSource } from './season-round-table-datasource';
const { flag } = require('country-emoji');

@Component({
  selector: 'app-season-round-table',
  templateUrl: './season-round-table.component.html',
  styleUrls: ['./season-round-table.component.scss'],
})
export class SeasonRoundTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RaceModel>;
  yearControl = new FormControl();
  seasonList = this.seasonService.getAllSeasons();

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

  ngOnInit() {
    this.seasonList
      .pipe(
        switchMap(() =>
          this.route.params.pipe(
            map((params) => params['season']),
            take(1)
          )
        ),
        tap((season) => {
          if (season !== 'current') {
            this.yearControl.setValue(season);
          }
        }),
        filter((season) => season === 'current'),
        switchMap(() =>
          this.seasonService.getCurrentSeason().pipe(
            tap((currentSeason) => {
              this.yearControl.setValue(currentSeason, { emitEvent: false });
            })
          )
        )
      )
      .subscribe();

    this.yearControl.valueChanges
      .pipe(tap((year) => this.router.navigate([`/season/${year}`])))
      .subscribe();
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
