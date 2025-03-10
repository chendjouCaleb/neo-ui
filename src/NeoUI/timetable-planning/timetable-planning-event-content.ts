import {Directive, TemplateRef} from '@angular/core';
import {DayOfWeek, TimetableItemDescriptor} from '../timetable';

export interface TimetablePlanningEventContentDefContext {
  event: TimetableItemDescriptor
}

@Directive({
  selector: '[TimetablePlanningEventContentDef]',
  standalone: true
})
export class TimetablePlanningEventContentDef {
  constructor(public template: TemplateRef<TimetablePlanningEventContentDefContext>) {}
}

export interface TimetablePlanningDayDefContext {
  dayOfWeek: DayOfWeek
}

@Directive({
  selector: '[TimetablePlanningDayDef]',
  standalone: true
})
export class TimetablePlanningDayDef {
  constructor(public template: TemplateRef<TimetablePlanningDayDefContext>) {}
}



export interface TimetablePlanningHourDefContext {
  event: TimetableItemDescriptor
}
@Directive({
  selector: '[TimetablePlanningHourDef]',
  standalone: true
})
export class TimetablePlanningHourDef {
  constructor(public template: TemplateRef<TimetablePlanningHourDefContext>) {}
}
