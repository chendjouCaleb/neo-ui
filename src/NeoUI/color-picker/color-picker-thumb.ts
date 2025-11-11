import {ChangeDetectionStrategy, Component, Input, numberAttribute, ViewEncapsulation} from '@angular/core';
import {FluentPaletteColor} from '../helpers';

@Component({
  template: '',
  styles: `
    .my-color-picker-color-thumb {
      display: inline-block;
      overflow: hidden;
    }
  `,
  selector: 'MyColorPickerColorThumb',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-color-picker-color-thumb',
    '[style.background-color]' : "getCssBackgroundColor()",
    '[style.height.px]': 'size',
    '[style.width.px]': 'size',
    '[style.border-radius.px]': 'size',
  }

})
export class MyColorPickerThumb {
  @Input({required: true})
  palette: FluentPaletteColor;

  @Input({transform: numberAttribute})
  size = 32;

  getCssBackgroundColor(): string {
    return `var(--colorPalette${this.palette}Background2)`
  }
}
