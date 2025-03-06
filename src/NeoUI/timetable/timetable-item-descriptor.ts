import {LocalTime} from '@js-joda/core';

export enum DayOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7
}

export const dayOfWeeks = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday
]

export const DayOfWeeksFrIntl = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

export class TimetableItemDescriptor {
  title: string
  color?: string
  dayOfWeek: DayOfWeek
  startAt: LocalTime
  endAt: LocalTime
}
