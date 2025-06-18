import {Component, Input, numberAttribute, ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'MySpinner',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  templateUrl: 'spinner.html',
  styleUrl: 'spinner.scss',
  host: {
    'class': 'my-spinner',
    '[style.width.px]':'diameter',
    '[style.height.px]':'diameter',
    '[style.borderWidth.px]':'strokeWidth'
  }
})
export class Spinner {
  @Input({transform: numberAttribute})
  strokeWidth: number = 4;

  @Input({transform: numberAttribute})
  diameter: number = 32;
}
