import {Directive, TemplateRef} from '@angular/core';
import {LocalTime, ZonedDateTime} from '@js-joda/core';
import {AgendaEventDescriptor} from './agenda-event-descriptor';

export interface AgendaEventContentDefContext {
  event: AgendaEventDescriptor
}

@Directive({
  selector: '[AgendaEventContentDef]',
  standalone: true
})
export class AgendaEventContentDef {
  constructor(public template: TemplateRef<AgendaEventContentDefContext>) {}
}

export interface AgendaHeaderCellDefContext {
  day: ZonedDateTime
}

@Directive({
  selector: '[AgendaHeaderCellDef]',
  standalone: true
})
export class AgendaHeaderCellDef {
  constructor(public template: TemplateRef<AgendaHeaderCellDefContext>) {}
}



export interface AgendaHourDefContext {
  hour: LocalTime
}
@Directive({
  selector: '[AgendaHourDef]',
  standalone: true
})
export class AgendaHourDef {
  constructor(public template: TemplateRef<AgendaHourDefContext>) {}
}
