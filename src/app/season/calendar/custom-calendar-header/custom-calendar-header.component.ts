import { Component } from '@angular/core';
import { MatCalendarHeader } from '@angular/material/datepicker';

/** Custom header component for datepicker. */
@Component({
  templateUrl: './custom-calendar-header.component.html',
})
export class CustomCalendarHeader extends MatCalendarHeader<any> {
  /** Handles user clicks on the period label. */
  currentPeriodClicked(): void {
    this.calendar.currentView =
      this.calendar.currentView == 'month' ? 'multi-year' : 'month';
  }

  /** Handles user clicks on the previous button. */
  customPrev(): void {
    this.previousClicked();
    this.calendar.monthSelected.next(this.calendar.activeDate);
  }

  /** Handles user clicks on the next button. */
  customNext(): void {
    this.nextClicked();
    this.calendar.monthSelected.next(this.calendar.activeDate);
  }
}
