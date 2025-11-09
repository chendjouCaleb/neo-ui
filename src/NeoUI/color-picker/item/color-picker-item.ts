import {booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {capitalizeFirstLetter, FluentPaletteColor} from '../../helpers';
import {fluentPaletteColorIntlFr} from '../../helpers/fluent-color-palette-intl.fr';
import {MyColorPickerThumb} from '../color-thumb';

@Component({
  templateUrl: 'color-picker-item.html',
  styleUrl: 'color-picker-item.scss',
  selector: 'MyColorPickerItem',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MyColorPickerThumb
  ],
  host: {
    class: 'my-color-picker-item',
    '[style.border-color]': 'getCssBorderColor()'
  }

})
export class MyColorPickerItem {

  @Input({required: true})
  palette: FluentPaletteColor

  @Input({transform: booleanAttribute})
  selected: boolean



  getCssBorderColor(): string {
    return this.selected ? `var(--colorPalette${this.palette}BorderActive)` : 'transparent';
  }

  getColorName(): string {
    const name = fluentPaletteColorIntlFr[this.palette];
    if(name) {
      return capitalizeFirstLetter(this.palette);
    }
    return ''
  }
}
