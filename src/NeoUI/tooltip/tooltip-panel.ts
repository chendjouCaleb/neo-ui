import {Component, Input, ViewEncapsulation} from '@angular/core';
import {BeakPosition} from './tooltip';

@Component({
  templateUrl: 'tooltip-panel.html',
  styleUrl: 'tooltip-panel.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'my-tooltip-container'
  }
})
export class TooltipPanel {

  message: string

  beakPosition: BeakPosition

  constructor() {
  }
}
