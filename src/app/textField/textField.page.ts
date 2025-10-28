import {Component} from '@angular/core';
import {
  MaterialIcon,
  MyTextField, TextFieldHint,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLeadingContent,
  TextFieldMessage,
  TextFieldTrailingContent
} from '../../NeoUI';

@Component({
    selector: 'TextFieldPage',
  imports: [
    MyTextField,
    TextFieldInput,
    TextFieldLabel,
    TextFieldMessage,
    TextFieldLeadingContent,
    MaterialIcon,
    TextFieldTrailingContent,
    TextFieldHint
  ],
    templateUrl: 'textField.page.html'
})
export class TextFieldPage {

}
