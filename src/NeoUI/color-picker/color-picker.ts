import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  templateUrl: 'color-picker.html',
  styleUrl: 'color-picker.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'my-color-picker'
  }
})
export class ColorPicker {

}
