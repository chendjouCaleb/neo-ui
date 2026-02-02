import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'MyTableHeadCell',
  templateUrl: 'table-head-cell.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-table-head-cell'
  }
})
export class MyTableHeadCell {

}
