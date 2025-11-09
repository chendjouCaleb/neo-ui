import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {FluentPaletteColor} from '../helpers';

@Component({
  template: '',
  styles: `
    .my-color-picker-color-thumb {
      width: 32px;
      height: 32px;
      border-radius: 32px;
      display: inline-block;
      //overflow: hidden;
    }
  `,
  selector: 'MyColorPickerColorThumb',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-color-picker-color-thumb',
    '[style.background-color]' : "getCssBackgroundColor()"
  }

})
export class MyColorPickerThumb {
  @Input({required: true})
  palette: FluentPaletteColor;

  getCssBackgroundColor(): string {
    return `var(--colorPalette${this.palette}Background2)`
  }
}
