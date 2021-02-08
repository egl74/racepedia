import { NgModule } from '@angular/core';
import { SeasonService } from './services/season.service';
import { SeasonRoundTableComponent } from './season-round-table/season-round-table.component';
import { DriverStandingsComponent } from './standings/driver/driver-standings.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeasonSelectorComponent } from './season-selector/season-selector.component';
import { TeamListComponent } from './team-list/team-list.component';
import { MatCardModule } from '@angular/material/card';
import { CalendarComponent } from './calendar/calendar.component';
import { CustomCalendarHeader } from './calendar/custom-calendar-header/custom-calendar-header.component';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { CustomDateAdapter } from './services/custom-data-adapter.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ConstructorStandingsComponent } from './standings/constructor/constructor-standings.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    DriverStandingsComponent,
    SeasonRoundTableComponent,
    SeasonSelectorComponent,
    TeamListComponent,
    CustomCalendarHeader,
    CalendarComponent,
    ConstructorStandingsComponent,
  ],
  exports: [DriverStandingsComponent, ConstructorStandingsComponent],
  providers: [
    SeasonService,
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class SeasonModule {}
