import {Component, ContentChild, Input, ViewEncapsulation} from '@angular/core';
import {AgendaEventDescriptor} from '../agenda';
import {ZonedDateTime} from '@js-joda/core';
import {
  AgendaPlanningDayDef,
  AgendaPlanningDayDefContext,
  AgendaPlanningEventContentDef,
  AgendaPlanningEventContentDefContext,
  AgendaPlanningHourDef,
  AgendaPlanningHourDefContext
} from './agenda-planning-event-content';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'MyAgendaPlanning',
  templateUrl: 'agenda-planning.html',
  styleUrl: 'agenda-planning.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  host: {
    class: 'my-agenda-planning'
  }
})
export class AgendaPlanning {
  @Input()
  events: AgendaEventDescriptor[] = [];


  @Input()
  days: ZonedDateTime[] = [
    ZonedDateTime.now(),
    ZonedDateTime.now().plusDays(1),
    ZonedDateTime.now().plusDays(2),
    ZonedDateTime.now().plusDays(3),
    ZonedDateTime.now().plusDays(4),
    ZonedDateTime.now().plusDays(5),
  ];

  @ContentChild(AgendaPlanningDayDef)
  dayTemplateDef: AgendaPlanningDayDef

  @ContentChild(AgendaPlanningHourDef)
  hourTemplateDef: AgendaPlanningHourDef

  @ContentChild(AgendaPlanningEventContentDef)
  eventTemplateDef: AgendaPlanningEventContentDef

  getDayEvents(day: ZonedDateTime): AgendaEventDescriptor[] {
    return this.events.filter(e => e.day.toLocalDate().equals(day.toLocalDate()))
  }

  _getEventTemplateContext(event: AgendaEventDescriptor): AgendaPlanningEventContentDefContext {
    return {
      event: event
    }
  }

  _getDayTemplateContext(day: ZonedDateTime): AgendaPlanningDayDefContext {
    return {
      day
    }
  }

  _getHourTemplateContext(event: AgendaEventDescriptor): AgendaPlanningHourDefContext {
    return {
      event
    }
  }
}
