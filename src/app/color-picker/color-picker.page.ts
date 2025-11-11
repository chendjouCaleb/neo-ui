import {Component} from '@angular/core';
import {MyColorPickerPanel} from '../../NeoUI/color-picker';
import {MyColorPicker} from '../../NeoUI/color-picker';
import {MyLabel, TextField, TextFieldInput} from '../../NeoUI';
import {MySelect} from '../../NeoUI/select/select';

@Component({
    templateUrl: 'color-picker.page.html',
  imports: [
    MyColorPickerPanel,
    MyColorPicker,
    TextField,
    MyLabel,
    TextFieldInput,
    MySelect
  ],
    selector: 'SelectPage'
})
export class ColorPickerPage {

}
