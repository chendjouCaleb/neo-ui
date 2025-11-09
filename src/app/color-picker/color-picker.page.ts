import {Component} from '@angular/core';
import {Button, MyPersonaImage, Persona, Tag, TagDismiss} from '../../NeoUI';
import {NgOptimizedImage} from '@angular/common';
import {MyColorPickerPanel} from '../../NeoUI/color-picker/panel/color-picker-panel';

@Component({
    templateUrl: 'color-picker.page.html',
  imports: [
    MyColorPickerPanel
  ],
    selector: 'SelectPage'
})
export class ColorPickerPage {

}
