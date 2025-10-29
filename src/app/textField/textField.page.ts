import {Component} from '@angular/core';
import {
  MaterialIcon,
  MyTextField, TextFieldHint,
  TextFieldInput,
  MyLabel,
  TextFieldMessage,  MyTextFieldTrailingContent, MyTextFieldLeadingContent
} from '../../NeoUI';

@Component({
    selector: 'TextFieldPage',
  imports: [
    MyTextField,
    TextFieldInput,
    MyLabel,
    TextFieldMessage,
    MaterialIcon,
    TextFieldHint,
    MyTextFieldTrailingContent,
    MyTextFieldLeadingContent
  ],
    templateUrl: 'textField.page.html'
})
export class TextFieldPage {

}
