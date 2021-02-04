import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { filter, map, take, tap } from 'rxjs/operators';
import { SeasonService } from '../services/season.service';

@Component({
  selector: 'app-season-selector',
  templateUrl: './season-selector.component.html',
  styleUrls: ['./season-selector.component.scss'],
})
export class SeasonSelectorComponent {
  seasonList = this.seasonService.getAllSeasons();
  yearControl = new FormControl();
  @Output() yearControlChange = new EventEmitter<string>();

  constructor(
    private readonly seasonService: SeasonService,
    private readonly route: ActivatedRoute
  ) {}

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
      .pipe(tap((year) => this.yearControlChange.emit(year)))
      .subscribe();
  }
}
