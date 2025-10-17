import {Component, Input} from '@angular/core';
import {DayOfWeek, Timetable, TimetableItemDescriptor} from '../../NeoUI';
import {DateTimeFormatter, LocalTime} from '@js-joda/core';
import {TimetableItemDef} from '../../NeoUI/timetable/timetable-item-def';

@Component({
    templateUrl: 'timetable.page.html',
    imports: [Timetable, TimetableItemDef],
    selector: 'TimetablePage'
})
export class TimetablePage {
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
}
