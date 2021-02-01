import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { RaceResultsComponent } from './race-results-component/race-results-component.component';
import { RoundService } from './services/round.service';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    MatExpansionModule,
    SharedModule,
  ],
  declarations: [RaceResultsComponent],
  providers: [RoundService],
})
export class RoundModule {}
