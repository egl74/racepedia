import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RaceResultsComponent } from './round/race-results-component/race-results-component.component';
import { CalendarComponent } from './season/calendar/calendar.component';
import { SeasonRoundTableComponent } from './season/season-round-table/season-round-table.component';
import { TeamListComponent } from './season/team-list/team-list.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'season',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'current' },
      {
        path: ':season',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: SeasonRoundTableComponent,
          },
          {
            path: 'round',
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'last' },
              { path: ':round', component: RaceResultsComponent },
            ],
          },
          {
            path: 'teams',
            component: TeamListComponent,
          },
        ],
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
  {
    path: 'calendar',
    children: [
      { path: '', component: CalendarComponent },
      { path: ':year/:month', component: CalendarComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
