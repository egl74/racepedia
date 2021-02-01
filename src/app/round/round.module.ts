import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RaceResultsComponent } from './race-results-component/race-results-component.component';
import { RoundService } from './services/round.service';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatGridListModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  declarations: [RaceResultsComponent],
  providers: [RoundService],
})
export class RoundModule {}
