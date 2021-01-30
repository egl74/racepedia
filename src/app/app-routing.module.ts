import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RaceResultsComponent } from './round/race-results.component';
import { SeasonRoundTableComponent } from './season/season-round-table/season-round-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/season/current', pathMatch: 'full' },
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
        ],
      },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
