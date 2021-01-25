import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { RaceModel } from '../models/race.model';
import { SeasonModel } from '../models/season.model';
import { SeasonService } from '../services/season.service';
import { SeasonsDataSource } from './seasons-datasource';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
})
export class SeasonsComponent implements AfterViewInit {
  @ViewChild(MatTable) table: MatTable<RaceModel>;
  dataSource: SeasonsDataSource;
  seasonList: Observable<SeasonModel[]> = this.seasonService.getAllSeasons();
  yearControl = new FormControl();

  constructor(
    private readonly seasonService: SeasonService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.dataSource = new SeasonsDataSource(
      this.seasonService,
      this.yearControl.valueChanges
    );
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['round', 'race', 'circuit'];

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;

    this.seasonList
      .pipe(
        switchMap(() =>
          this.route.params.pipe(map((params) => params['season']))
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
              this.yearControl.setValue(currentSeason);
            })
          )
        ),
        switchMap(() =>
          this.yearControl.valueChanges.pipe(
            tap((year) => this.router.navigate([`/season/${year}`]))
          )
        )
      )
      .subscribe();
  }
}
