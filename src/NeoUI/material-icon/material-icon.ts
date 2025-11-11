import {booleanAttribute, Component, Input, numberAttribute} from '@angular/core';


export type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp'

@Component({
  template: `
    <ng-content></ng-content>`,
  selector: 'MaterialIcon, [MaterialIcon], MyMaterialIcon, [MyMaterialIcon]',
  standalone: true,
  styles: `
    :host {
      display: inline
    }

    :host.fill {
      font-variation-settings: 'FILL' 1
    }`,
  host: {
    'class': 'my-material-icon',
    '[class.material-symbols-outlined]': "style == 'outlined'",
    '[class.material-symbols-sharp]': "style == 'sharp'",
    '[class.material-symbols-rounded]': "style == 'rounded'",
    '[class.fill]': "fill",
    '[style.font-size.px]': 'size',
    '[style.height.px]': 'size',
    '[style.width.px]': 'size',

  }
})
export class MaterialIcon {
  @Input('iconStyle')
  style: MaterialIconStyle = 'rounded';

  @Input({transform: numberAttribute})
  size: number

  @Input({transform: booleanAttribute})
  fill: boolean
}
