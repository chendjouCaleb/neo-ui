import {Component, Input, ViewEncapsulation} from '@angular/core';
import {TooltipPosition} from './tooltip-options';

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
  position: TooltipPosition

  constructor() {
  }
}
