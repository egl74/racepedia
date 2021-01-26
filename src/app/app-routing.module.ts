import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeasonRoundTableComponent } from './season/season-round-table/season-round-table.component';
import { SeasonComponent } from './season/season/season.component';

const routes: Routes = [
  { path: '', redirectTo: '/season/current/rounds', pathMatch: 'full' },
  {
    path: 'season',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'current' },
      {
        path: ':season',
        component: SeasonComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'rounds' },
          { path: 'rounds', component: SeasonRoundTableComponent },
          { path: '**', component: PageNotFoundComponent },
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
