import {Component} from '@angular/core';
import {TextField, TextFieldLabel} from '../../components';
import {TextFieldInput} from '../../components';

@Component({
  selector: 'TextFieldPage',
  standalone: true,
  imports: [
    TextField,
    TextFieldInput,
    TextFieldLabel
  ],
  template: `
    <TextField>
      <label TextFieldLabel for="input1">Nom & prénom</label>
      <input type="text" id="input1" placeholder="Entrez votre nom" TextFieldInput>
    </TextField>
  `
})
export class TextFieldPage {

}
