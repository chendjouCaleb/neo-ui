import {Routes} from '@angular/router';
import {DropdownPage} from './dropdown/dropdown.page';
import {PagerPage} from './pager/pager.page';
import {TimetablePage} from './timetable/timetable.page';
import {AgendaMonthPage} from './month-calendar/agenda-month.page';
import {AgendaPage} from './agenda/agenda.page';

import {TimetablePlanningPage} from './timetable-planning/timetable-planning.page';
import {AgendaPlanningPage} from './agenda-planning/agenda-planning.page';
import {CheckboxPage} from './checkbox/checkbox.page';

export const routes: Routes = [
  {path: '', component: CheckboxPage },
  {path: 'timetable', component: TimetablePage},
  {path: 'checkbox', component: CheckboxPage},
  {path: 'dropdown', component: DropdownPage},
  {path: 'pager', component: PagerPage},
  {path: 'month-calendar', component: AgendaMonthPage},
  {path: 'agenda', component: AgendaPage},
  {path: 'agenda-planning', component: AgendaPlanningPage},
  {path: 'agenda-month', component: AgendaMonthPage},
  {path: 'timetable-planning', component: TimetablePlanningPage},

];
