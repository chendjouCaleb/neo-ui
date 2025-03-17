import {Routes} from '@angular/router';
import {DropdownPage} from './dropdown/dropdown.page';
import {PagerPage} from './pager/pager.page';
import {TimetablePage} from './timetable/timetable.page';
import {AgendaMonthPage} from './month-calendar/agenda-month.page';
import {AgendaPage} from './agenda/agenda.page';

import {TimetablePlanningPage} from './timetable-planning/timetable-planning.page';
import {AgendaPlanningPage} from './agenda-planning/agenda-planning.page';
import {CheckboxPage} from './checkbox/checkbox.page';
import {PersonaPage} from './persona/persona.page';
import {TooltipPage} from './tooltip/tooltip.page';
import {PopoverPage} from './popover/popover.page';
import {ToastPage} from './toast/toast.page';
import {SwitchPage} from './switch/switch.page';

export const routes: Routes = [
  {path: '', component: SwitchPage },
  {path: 'tooltip', component: TooltipPage },
  {path: 'switch', component: SwitchPage },
  {path: 'toast', component: ToastPage },
  {path: 'popover', component: PopoverPage },
  {path: 'timetable', component: TimetablePage},
  {path: 'checkbox', component: CheckboxPage},
  {path: 'persona', component: PersonaPage},
  {path: 'dropdown', component: DropdownPage},
  {path: 'pager', component: PagerPage},
  {path: 'month-calendar', component: AgendaMonthPage},
  {path: 'agenda', component: AgendaPage},
  {path: 'agenda-planning', component: AgendaPlanningPage},
  {path: 'agenda-month', component: AgendaMonthPage},
  {path: 'timetable-planning', component: TimetablePlanningPage},

];
