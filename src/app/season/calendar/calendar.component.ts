import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { RaceModel } from 'src/app/models/race.model';
import { SeasonService } from '../services/season.service';
import { CustomCalendarHeader } from './custom-calendar-header/custom-calendar-header.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements AfterViewInit {
  private currentYear: number;
  private races: RaceModel[] = [];
  header = CustomCalendarHeader;
  dateFilter: (date: Date) => boolean = () => false;
  @ViewChild(MatCalendar, { static: false }) calendar: MatCalendar<Date>;

  constructor(
    private readonly seasonService: SeasonService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.route.params.subscribe((params) =>
      this.onMonthChange(
        params['year']
          ? new Date(params['year'], params['month'] - 1)
          : new Date()
      )
    );
  }

  onMonthChangeClick(date: Date) {
    this.router.navigate([date.getFullYear(), date.getMonth() + 1], {
      relativeTo: this.route.parent,
    });
    this.onMonthChange(date);
  }

  viewChanged(view) {
    if (view !== 'month') {
      this.dateFilter = () => true;
    }
  }

  selected(date) {
    const round = this.races.find((race) => race.date === this.toISODate(date))
      ?.round;
    if (round) {
      this.router.navigate(['season', this.currentYear, 'round', round]);
    }
  }

  private toISODate(date: Date) {
    return `${date.getFullYear()}-${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)
    }-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`;
  }

  private getFateFilter(dates: string[]): (date: Date) => boolean {
    return (date: Date) => dates && dates.includes(this.toISODate(date));
  }

  private onMonthChange(date: Date) {
    this.calendar.activeDate = date;
    if (
      this.calendar.currentView !== 'month' ||
      date.getFullYear() !== this.currentYear
    ) {
      this.dateFilter = () => false;
      this.cdr.detectChanges();
      this.currentYear = date.getFullYear();
      this.seasonService
        .getSeason(date.getFullYear().toString())
        .pipe(
          tap((season) => (this.races = season.Races)),
          map((season) => season.Races.map((race) => race.date)),
          tap((raceDates) => (this.dateFilter = this.getFateFilter(raceDates))),
          tap(() => this.cdr.detectChanges())
        )
        .subscribe();
    }
  }
}
