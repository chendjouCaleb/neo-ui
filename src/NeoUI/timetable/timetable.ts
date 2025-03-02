import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'Timetable',
  templateUrl: 'timetable.html',
  styleUrl: 'timetable.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'timetable'
  }
})
export class Timetable {

}
