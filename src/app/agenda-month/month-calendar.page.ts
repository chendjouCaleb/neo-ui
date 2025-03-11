import {Component} from '@angular/core';
import {CalendarMonth, CalendarMonthDayDef, Timetable} from '../../NeoUI';
import {convert, LocalDate} from '@js-joda/core';
import {TimetableItemDef} from '../../NeoUI/timetable/timetable-item-def';
import {MonthRange} from '../../NeoUI';

@Component({
  templateUrl: 'month-calendar.page.html',
  standalone: true,
  imports: [Timetable, TimetableItemDef, CalendarMonth, CalendarMonthDayDef],
  selector: 'MonthCalendarPage'
})
export class MonthCalendarPage {
  monthRange = new MonthRange()

  prev() {
    this.monthRange = this.monthRange.prevMonth()
  }

  next() {
    this.monthRange = this.monthRange.nextMonth()
  }

 // formatter = DateTimeFormatter.ofPattern('MMMM/d/yyyy')

  toJsDate(date: LocalDate): Date {
    return convert(date).toDate()
  }
}
