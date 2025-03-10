import {ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation} from '@angular/core';
import {DayOfWeek, DayOfWeeksFrIntl, TimetableItemDescriptor} from '../timetable';
import {DateTimeFormatter} from '@js-joda/core';
import {
  TimetablePlanningDayDef,
  TimetablePlanningDayDefContext,
  TimetablePlanningEventContentDef,
  TimetablePlanningEventContentDefContext,
  TimetablePlanningHourDef,
  TimetablePlanningHourDefContext
} from './timetable-planning-event-content';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  templateUrl: 'timetable-planning.html',
  styleUrl: 'timetable-planning.scss',
  selector: 'MyTimetablePlanning',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  host: {
    'class': 'my-timetable-planning'
  }
})
export class TimetablePlanning {

  @Input()
  dayOfWeeks = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
    DayOfWeek.Sunday
  ]

  @Input()
  events: TimetableItemDescriptor[] = []

  @Input()
  hourFormatter = DateTimeFormatter.ofPattern('HH:mm')

  @ContentChild(TimetablePlanningEventContentDef)
  contentDef: TimetablePlanningEventContentDef

  @ContentChild(TimetablePlanningDayDef)
  dayTemplateDef: TimetablePlanningDayDef

  @ContentChild(TimetablePlanningHourDef)
  hourTemplateDef: TimetablePlanningHourDef

  getDayItems(day: DayOfWeek) : TimetableItemDescriptor[] {
    return this.events.filter(i => i.dayOfWeek === day);
  }

  dayOfWeekIntl(dayOfWeek: DayOfWeek) {
    return DayOfWeeksFrIntl[dayOfWeek - 1]
  }

  _getDayOfWeekContext(dayOfWeek: DayOfWeek): TimetablePlanningDayDefContext {
    return { dayOfWeek}
  }

  _getHourContext(event: TimetableItemDescriptor): TimetablePlanningHourDefContext {
    return { event }
  }

  _getContentContext(event: TimetableItemDescriptor): TimetablePlanningEventContentDefContext {
    return { event }
  }
}
