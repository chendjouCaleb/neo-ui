import {Component, Directive, TemplateRef} from '@angular/core';
import {convert, LocalDate} from '@js-joda/core';
import {TimetableItemDefContext} from '../timetable/timetable-item-def';

export interface CalendarMonthDayContext {
  day: LocalDate
}

@Directive({
  standalone: true,
  selector: '[CalendarMonthDayDef]',

})
export class CalendarMonthDayDef {
  constructor(public template: TemplateRef<CalendarMonthDayContext>) {}


}
