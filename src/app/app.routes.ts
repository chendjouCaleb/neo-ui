import {Routes} from '@angular/router';
import {DropdownPage} from './dropdown/dropdown.page';
import {PagerPage} from './pager/pager.page';
import {TimetablePage} from './timetable/timetable.page';
import {MonthCalendarPage} from './month-calendar/month-calendar.page';
import {AgendaPage} from './agenda/agenda.page';
import {AgendaPlanningPage} from './agenda-planning/agenda-planning.page';

export const routes: Routes = [
  {path: '', component: AgendaPlanningPage },
  {path: 'timetable', component: TimetablePage},
  {path: 'dropdown', component: DropdownPage},
  {path: 'pager', component: PagerPage},
  {path: 'month-calendar', component: MonthCalendarPage},
  {path: 'agenda', component: AgendaPage},
  {path: 'agenda-planning', component: AgendaPlanningPage}

];
