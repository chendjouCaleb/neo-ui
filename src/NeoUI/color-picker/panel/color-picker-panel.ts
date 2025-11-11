import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject, Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FluentPaletteColor, fluentPaletteColors} from '../../helpers/fluent-color';
import {MyColorPickerItem} from '../item';

@Component({
  templateUrl: 'color-picker-panel.html',
  styleUrl: 'color-picker-panel.scss',
  selector: 'MyColorPickerPanel',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MyColorPickerItem
  ],
  host: {
    class: 'my-color-picker-panel'
  }

})
export class MyColorPickerPanel {
  private _changeDetector = inject(ChangeDetectorRef);
  paletteColors = fluentPaletteColors;


  @Input()
  set selected(value: FluentPaletteColor) {
    this._selected = value
    this._changeDetector.markForCheck()
  }
  get selected(): FluentPaletteColor {
    return this._selected;
  }
  private _selected: FluentPaletteColor | undefined




  @Output()
  onChange = new EventEmitter<FluentPaletteColor>();

  isSelected(palette: FluentPaletteColor): boolean {
    return this.selected === palette;
  }

  _onClick(palette: FluentPaletteColor) {
    this._selected = palette;
    this._emitChange();
    this._changeDetector.markForCheck()
  }

  clear() {
    this._selected = undefined
  }

  private _emitChange() {
    this.onChange.emit(this._selected);

  }
}
