import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasonsComponent } from './seasons/seasons.component';

const routes: Routes = [
  { path: '', redirectTo: '/season/current', pathMatch: 'full' },
  {
    path: 'season',
    children: [{ path: ':season', component: SeasonsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
