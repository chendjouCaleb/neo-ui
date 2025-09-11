import {Component} from '@angular/core';


export type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp'
@Component({
  template: `<ng-content></ng-content>`,
  selector: 'MaterialIcon, [MaterialIcon], MyMaterialIcon, [MyMaterialIcon]',
  standalone: true,
  styles: `:host { display: inline}`,
  host: {
    'class': 'my-material-icon',
    '[class.material-symbols-outlined]' : "style == 'outlined'",
    '[class.material-symbols-sharp]' : "style == 'sharp'",
    '[class.material-symbols-rounded]' : "style == 'rounded'",
  }
})
export class MaterialIcon {
  style : MaterialIconStyle = 'rounded';
}
