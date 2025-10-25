import {Component} from '@angular/core';
import {
  MaterialIcon,
  TextField,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLeadingContent,
  TextFieldMessage,
  TextFieldTrailingContent
} from '../../NeoUI';

@Component({
    selector: 'TextFieldPage',
  imports: [
    TextField,
    TextFieldInput,
    TextFieldLabel,
    TextFieldMessage,
    TextFieldLeadingContent,
    MaterialIcon,
    TextFieldTrailingContent
  ],
    templateUrl: 'textField.page.html'
})
export class TextFieldPage {

}
