import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of, zip } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { DriverStatsModel, TeamModel } from 'src/app/models/team.model';
import { SeasonService } from '../services/season.service';
const { flag } = require('country-emoji');

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  constructor(
    private seasonService: SeasonService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  flag = flag;

  teams$: BehaviorSubject<TeamModel[]> = new BehaviorSubject<TeamModel[]>([]);

  ngOnInit() {
    this.route.parent &&
      this.route.parent.params
        .pipe(
          map((params) => params['season']),
          switchMap((season: string) => this.seasonService.getTeams(season)),
          tap((teams) => this.teams$.next(teams)),
          mergeMap((teams) =>
            combineLatest(
              teams.map((team) =>
                this.seasonService
                  .getAllTimeTeamFinishes(team.constructorId, 1)
                  .pipe(
                    map((wins) => {
                      team.wins = wins;
                      return team;
                    })
                  )
              )
            )
          ),
          tap((teams) => this.teams$.next(teams)),
          mergeMap((teams) =>
            combineLatest(
              teams.map((team) =>
                zip(
                  this.seasonService.getAllTimeTeamFinishes(
                    team.constructorId,
                    2
                  ),
                  this.seasonService.getAllTimeTeamFinishes(
                    team.constructorId,
                    3
                  )
                ).pipe(
                  map(([second, third]) => {
                    team.podiums = team.wins + second + third;
                    return team;
                  })
                )
              )
            )
          ),
          tap((teams) => this.teams$.next(teams)),
          mergeMap((teams) =>
            combineLatest(
              teams.map((team) =>
                this.route.parent
                  ? this.route.parent.params.pipe(
                      map((params) => params['season']),
                      switchMap((season: any) =>
                        this.seasonService
                          .getTeamRoster(team.constructorId, season)
                          .pipe(
                            map((drivers) => {
                              team.driverRoster = drivers.map(
                                (driver) =>
                                  new DriverStatsModel({
                                    name: `${driver.givenName} ${driver.familyName}`,
                                    country: driver.nationality,
                                    permanentNumber: driver.permanentNumber,
                                    driverId: driver.driverId,
                                  })
                              );
                              return team;
                            })
                          )
                      )
                    )
                  : of(new TeamModel({}))
              )
            )
          ),
          tap((teams) => this.teams$.next(teams))
        )
        .subscribe();
  }

  switchSeason(year: string) {
    this.router.navigate([`/season/${year}/teams`]);
  }
}
