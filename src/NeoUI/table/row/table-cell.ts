import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  template: `<ng-content></ng-content>`,
  selector: 'MyTableCell',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-table-cell'
  }
})
export class MyTableCell {

}
