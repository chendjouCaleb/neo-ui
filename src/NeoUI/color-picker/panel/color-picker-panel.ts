import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FluentPaletteColor, fluentPaletteColors} from '../../helpers/fluent-color';
import {NgClass} from '@angular/common';
import {fluentPaletteColorIntlFr} from '../../helpers/fluent-color-palette-intl.fr';
import {capitalizeFirstLetter} from '../../helpers';
import {MyColorPickerItem} from '../item';

@Component({
  templateUrl: 'color-picker-panel.html',
  styleUrl: 'color-picker-panel.scss',
  selector: 'MyColorPickerPanel',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    MyColorPickerItem
  ],
  host: {
    class: 'my-color-picker-panel'
  }

})
export class MyColorPickerPanel {
  private _changeDetector = inject(ChangeDetectorRef);
  paletteColors = fluentPaletteColors;

  private _selectedPalette: FluentPaletteColor | undefined
  get selectedPalette(): FluentPaletteColor {
    return this._selectedPalette;
  }

  @Output()
  onChange = new EventEmitter<FluentPaletteColor>();

  isSelected(palette: FluentPaletteColor): boolean {
    return this.selectedPalette === palette;
  }

  _onClick(palette: FluentPaletteColor) {
    this._selectedPalette = palette;
    this._emitChange();
    this._changeDetector.markForCheck()
  }

  clear() {
    this._selectedPalette = undefined
  }

  private _emitChange() {
    this.onChange.emit(this._selectedPalette);

  }
}
