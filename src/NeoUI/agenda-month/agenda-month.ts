import {Component, ContentChild, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MonthRange} from '../helpers';
import {convert, LocalDate} from '@js-joda/core';
import {AgendaMonthDayContext, AgendaMonthDayDef} from './agenda-month-day-def';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {AgendaEventDescriptor} from '../agenda';
import {DateTime} from 'luxon';

@Component({
  selector: 'MyAgendaMonth',
  templateUrl: 'agenda-month.html',
  styleUrl: 'agenda-month.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf
  ],
  host: {
    class: 'my-agenda-month'
  }
})
export class AgendaMonth implements OnInit {
  @Input()
  year: number = new Date().getFullYear()

  @Input()
  month: number = new Date().getMonth()

  @Input()
  events: AgendaEventDescriptor[] = []

  @ContentChild(AgendaMonthDayDef)
  dayTemplateDef: AgendaMonthDayDef

  monthRange: MonthRange
  weekRanges: Array<LocalDate[]>

  ngOnInit() {
    this.monthRange = new MonthRange(this.year, this.month + 1);
    this.weekRanges = this.monthRange.getWeeksRanges()
  }

  getDayEvents(day: LocalDate): AgendaEventDescriptor[] {
    return this.events.filter(e => e.day.toLocalDate().equals(day))
  }

  getDayContext(day: LocalDate): AgendaMonthDayContext {
    return { day, events: this.getDayEvents(day)}
  }

  toJsDate(date: LocalDate): Date {
    return convert(date).toDate()
  }
  toDatetime(date: LocalDate): DateTime {
    return DateTime.fromJSDate(convert(date).toDate())
  }

  protected readonly Intl = Intl;
}
