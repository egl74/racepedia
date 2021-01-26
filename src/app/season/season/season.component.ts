import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss'],
})
export class SeasonComponent implements OnInit {
  yearControl = new FormControl();
  seasonList = this.seasonService.getAllSeasons();

  constructor(
    private readonly seasonService: SeasonService,
    private readonly router: Router,
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
              this.yearControl.setValue(currentSeason);
            })
          )
        ),
        switchMap(() => this.yearControl.valueChanges.pipe(
          tap((year) => this.router.navigate([`/season/${year}`]))
        ))
      )
      .subscribe();
  }
}
