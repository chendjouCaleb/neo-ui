import { Routes } from '@angular/router';
import {DropdownPage} from './dropdown/dropdown.page';
import {PagerPage} from './pager/pager.page';
import {TimetablePage} from './timetable/timetable.page';

export const routes: Routes = [
  {path: '', component: TimetablePage },
  {path: 'timetable', component: TimetablePage },
  {path: 'dropdown', component: DropdownPage },
  {path: 'pager', component: PagerPage },

];
