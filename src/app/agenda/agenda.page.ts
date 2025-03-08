import {Component} from '@angular/core';
import {convert, DateTimeFormatter, LocalDate, LocalTime, ZonedDateTime} from '@js-joda/core';
import {
  Agenda,
  AgendaEventContentDef,
  AgendaEventDescriptor,
  DayOfWeek,
  MonthRange,
  TimetableItemDescriptor
} from '../../NeoUI';

@Component({
  templateUrl: 'agenda.page.html',
  standalone: true,
  imports: [Agenda, AgendaEventContentDef],
  selector: 'AgendaPage'
})
export class AgendaPage {
  items: AgendaEventDescriptor[] = [
    {
      title: "Analyse 101",
      day: ZonedDateTime.now(),
      startHour: LocalTime.parse("05:00"),
      endHour: LocalTime.parse("07:30"),
      color: "#0f6cbd"

    },
    {
      title: "Analyse 101",
      day: ZonedDateTime.now(),
      startHour: LocalTime.parse("08:00"),
      endHour: LocalTime.parse("10:00"),
      color: "#0f6cbd"
    },
    {
      title: "Algèbre",
      day: ZonedDateTime.now(),
      startHour: LocalTime.parse("08:00"),
      endHour: LocalTime.parse("10:00"),
      color: "#383966"
    },
    {
      title: "Analyse 101",
      day: ZonedDateTime.now().plusDays(1),
      startHour: LocalTime.parse("08:00"),
      endHour: LocalTime.parse("10:00"),
      color: "#0f6cbd"
    },
    {
      title: "Programmation",
      day: ZonedDateTime.now().plusDays(2),
      startHour: LocalTime.parse("08:30"),
      endHour: LocalTime.parse("10:30"),
      color: "#107c10"
    },
    {
      title: "Programmation",
      day: ZonedDateTime.now().plusDays(5),
      startHour: LocalTime.parse("12:30"),
      endHour: LocalTime.parse("14:00"),
      color: "#107c10"
    },
    {
      title: "Analyse 101",
      day: ZonedDateTime.now().plusDays(6),
      startHour: LocalTime.parse("10:00"),
      endHour: LocalTime.parse("12:00"),
      color: "#0f6cbd"
    },
    {
      title: "Grammaire",
      day: ZonedDateTime.now().plusDays(6),
      startHour: LocalTime.parse("12:15"),
      endHour: LocalTime.parse("14:00"),
      color: "#751d1f"
    },

    {
      title: "Grammaire",
      day: ZonedDateTime.now().plusDays(4),
      startHour: LocalTime.parse("07:00"),
      endHour: LocalTime.parse("08:00"),
      color: "#751d1f"
    },

    {
      title: "Programmation",
      day: ZonedDateTime.now().plusDays(4),
      startHour: LocalTime.parse("07:30"),
      endHour: LocalTime.parse("09:00"),
      color: "#107c10"
    },


    {
      title: "Littérature",
      day: ZonedDateTime.now().plusDays(1),
      startHour: LocalTime.parse("08:30"),
      endHour: LocalTime.parse("10:30"),
      color: "#6d2064"
    },

    {
      title: "Littérature",
      day: ZonedDateTime.now(),
      startHour: LocalTime.parse("12:30"),
      endHour: LocalTime.parse("14:30"),
      color: "#6d2064"
    },

    {
      title: "Littérature",
      day: ZonedDateTime.now().plusDays(2),
      startHour: LocalTime.parse("12:30"),
      endHour: LocalTime.parse("14:30"),
      color: "#6d2064"
    },

    {
      title: "Littérature",
      day: ZonedDateTime.now().plusDays(5),
      startHour: LocalTime.parse("06:30"),
      endHour: LocalTime.parse("08:30"),
      color: "#6d2064"
    },
  ]
  toJsDate(date: LocalDate): Date {
    return convert(date).toDate()
  }

  hourFormatter = DateTimeFormatter.ofPattern('HH:mm')
}
