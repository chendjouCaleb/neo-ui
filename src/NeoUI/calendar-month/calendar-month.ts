import {Component, ContentChild, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MonthRange} from '../helpers';
import {convert, LocalDate} from '@js-joda/core';
import {CalendarMonthDayContext, CalendarMonthDayDef} from './calendar-month-day';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'MyCalendarMonth',
  templateUrl: 'calendar-month.html',
  styleUrl: 'calendar-month.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  host: {
    class: 'my-calendar-month'
  }
})
export class CalendarMonth implements OnInit {
  @Input()
  year: number = new Date().getFullYear()

  @Input()
  month: number = new Date().getMonth()

  @ContentChild(CalendarMonthDayDef)
  dayTemplateDef: CalendarMonthDayDef

  monthRange: MonthRange
  weekRanges: Array<LocalDate[]>

  ngOnInit() {
    this.monthRange = new MonthRange(this.year, this.month);
    this.weekRanges = this.monthRange.getWeeksRanges()
  }

  getWeekRanges(index: number): LocalDate[][] {
    const ranges: LocalDate[][] = []
    for (let i = 0; i < 6; i++){
     // ranges[0] = this.monthRange.getWeeksRanges()
    }
    return ranges;
  }

  getDayContext(day: LocalDate): CalendarMonthDayContext {
    return { day}
  }

  toJsDate(date: LocalDate): Date {
    return convert(date).toDate()
  }
}
