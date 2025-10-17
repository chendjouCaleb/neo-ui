import {Component} from '@angular/core';
import {convert, DateTimeFormatter, LocalTime, ZonedDateTime} from '@js-joda/core';
import {DayOfWeek, formatDayOfWeek, TimetableItemDescriptor} from '../../NeoUI';
import {DateTime} from 'luxon';
import {TimetablePlanning} from '../../NeoUI/timetable-planning/timetable-planning';
import {
  TimetablePlanningDayDef, TimetablePlanningEventContentDef,
  TimetablePlanningHourDef
} from '../../NeoUI/timetable-planning/timetable-planning-event-content';

@Component({
    templateUrl: 'timetable-planning.page.html',
    imports: [
        TimetablePlanning,
        TimetablePlanningDayDef,
        TimetablePlanningHourDef,
        TimetablePlanningEventContentDef
    ],
    selector: 'TimetablePlanningPage'
})
export class TimetablePlanningPage {
  items: TimetableItemDescriptor[] = [
    {
      title: "Analyse 101",
      dayOfWeek: DayOfWeek.Monday,
      startAt: LocalTime.parse("05:00"),
      endAt: LocalTime.parse("07:30"),
      color: "#0f6cbd"

    },
    {
      title: "Analyse 101",
      dayOfWeek: DayOfWeek.Monday,
      startAt: LocalTime.parse("08:00"),
      endAt: LocalTime.parse("10:00"),
      color: "#0f6cbd"
    },
    {
      title: "Algèbre",
      dayOfWeek: DayOfWeek.Monday,
      startAt: LocalTime.parse("08:00"),
      endAt: LocalTime.parse("10:00"),
      color: "#383966"
    },
    {
      title: "Analyse 101",
      dayOfWeek: DayOfWeek.Tuesday,
      startAt: LocalTime.parse("08:00"),
      endAt: LocalTime.parse("10:00"),
      color: "#0f6cbd"
    },
    {
      title: "Programmation",
      dayOfWeek: DayOfWeek.Wednesday,
      startAt: LocalTime.parse("08:30"),
      endAt: LocalTime.parse("10:30"),
      color: "#107c10"
    },
    {
      title: "Programmation",
      dayOfWeek: DayOfWeek.Saturday,
      startAt: LocalTime.parse("12:30"),
      endAt: LocalTime.parse("14:00"),
      color: "#107c10"
    },
    {
      title: "Analyse 101",
      dayOfWeek: DayOfWeek.Sunday,
      startAt: LocalTime.parse("10:00"),
      endAt: LocalTime.parse("12:00"),
      color: "#0f6cbd"
    },
    {
      title: "Grammaire",
      dayOfWeek: DayOfWeek.Sunday,
      startAt: LocalTime.parse("12:15"),
      endAt: LocalTime.parse("14:00"),
      color: "#751d1f"
    },

    {
      title: "Grammaire",
      dayOfWeek: DayOfWeek.Friday,
      startAt: LocalTime.parse("07:00"),
      endAt: LocalTime.parse("08:00"),
      color: "#751d1f"
    },

    {
      title: "Programmation",
      dayOfWeek: DayOfWeek.Friday,
      startAt: LocalTime.parse("07:30"),
      endAt: LocalTime.parse("09:00"),
      color: "#107c10"
    },


    {
      title: "Littérature",
      dayOfWeek: DayOfWeek.Thursday,
      startAt: LocalTime.parse("08:30"),
      endAt: LocalTime.parse("10:30"),
      color: "#6d2064"
    },

    {
      title: "Littérature",
      dayOfWeek: DayOfWeek.Monday,
      startAt: LocalTime.parse("12:30"),
      endAt: LocalTime.parse("14:30"),
      color: "#6d2064"
    },

    {
      title: "Littérature",
      dayOfWeek: DayOfWeek.Wednesday,
      startAt: LocalTime.parse("12:30"),
      endAt: LocalTime.parse("14:30"),
      color: "#6d2064"
    },

    {
      title: "Littérature",
      dayOfWeek: DayOfWeek.Saturday,
      startAt: LocalTime.parse("06:30"),
      endAt: LocalTime.parse("08:30"),
      color: "#6d2064"
    },
  ]

  hourFormatter = DateTimeFormatter.ofPattern('HH:mm')

  toDateTime(date: ZonedDateTime): DateTime {
    return DateTime.fromJSDate(convert(date).toDate())
  }

  protected readonly formatDayOfWeek = formatDayOfWeek;
}
