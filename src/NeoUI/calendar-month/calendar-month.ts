import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'MyCalendarMonth',
  templateUrl: 'calendar-month.html',
  styleUrl: 'calendar-month.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'my-calendar-month'
  }
})
export class CalendarMonth {
  @Input()
  year: number = new Date().getFullYear()

  @Input()
  month: number = new Date().getMonth()
}
