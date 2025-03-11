import {Component} from '@angular/core';
import {CalendarMonth, CalendarMonthDayDef, MonthRange, Timetable} from '../../NeoUI';
import {convert, LocalDate} from '@js-joda/core';
import {AgendaMonth} from '../../NeoUI/agenda-month';
import {eventList} from '../event-list';

@Component({
  templateUrl: 'agenda-month.page.html',
  standalone: true,
  imports: [AgendaMonth],
  selector: 'AgendaMonthPage'
})
export class AgendaMonthPage {
  monthRange = new MonthRange()
  items = eventList

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
