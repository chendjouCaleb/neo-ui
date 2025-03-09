import {Component} from '@angular/core';
import {convert, DateTimeFormatter, LocalDate, ZonedDateTime} from '@js-joda/core';
import {Agenda, AgendaEventContentDef, AgendaHeaderCellDef, AgendaHourDef} from '../../NeoUI';
import {DateTime} from 'luxon';
import {eventList} from '../event-list';
import {
  AgendaPlanning,
  AgendaPlanningDayDef,
  AgendaPlanningEventContentDef,
  AgendaPlanningHourDef
} from '../../NeoUI/agenda-planning';

@Component({
  templateUrl: 'agenda-planning.page.html',
  standalone: true,
  imports: [Agenda, AgendaEventContentDef, AgendaHeaderCellDef, AgendaPlanning, AgendaHourDef, AgendaPlanningDayDef, AgendaPlanningHourDef, AgendaPlanningEventContentDef],
  selector: 'AgendaPage'
})
export class AgendaPlanningPage {
  items = eventList

  toJsDate(date: LocalDate): Date {
    return convert(date).toDate()
  }

  hourFormatter = DateTimeFormatter.ofPattern('HH:mm')

  toDateTime(date: ZonedDateTime): DateTime {
    return DateTime.fromJSDate(convert(date).toDate())
  }
}
