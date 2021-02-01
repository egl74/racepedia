import { NgModule } from '@angular/core';
import { SeasonService } from './services/season.service';
import { SeasonRoundTableComponent } from './season-round-table/season-round-table.component';
import { StandingsComponent } from './standings/standings.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatGridListModule,
    MatSelectModule,
  ],
  declarations: [StandingsComponent, SeasonRoundTableComponent],
  providers: [SeasonService],
})
export class SeasonModule {}
