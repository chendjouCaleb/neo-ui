import {Directive, TemplateRef} from '@angular/core';
import {LocalTime, ZonedDateTime} from '@js-joda/core';
import {AgendaEventDescriptor} from '../agenda';

export interface AgendaPlanningEventContentDefContext {
  event: AgendaEventDescriptor
}

@Directive({
  selector: '[AgendaPlanningEventContentDef]',
  standalone: true
})
export class AgendaPlanningEventContentDef {
  constructor(public template: TemplateRef<AgendaPlanningEventContentDefContext>) {}
}

export interface AgendaPlanningDayDefContext {
  day: ZonedDateTime
}

@Directive({
  selector: '[AgendaPlanningDayDef]',
  standalone: true
})
export class AgendaPlanningDayDef {
  constructor(public template: TemplateRef<AgendaPlanningDayDefContext>) {}
}



export interface AgendaPlanningHourDefContext {
  event: AgendaEventDescriptor
}
@Directive({
  selector: '[AgendaPlanningHourDef]',
  standalone: true
})
export class AgendaPlanningHourDef {
  constructor(public template: TemplateRef<AgendaPlanningHourDefContext>) {}
}
