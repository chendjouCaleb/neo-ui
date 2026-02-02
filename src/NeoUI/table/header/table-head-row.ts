import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'MyTableHeadRow',
  templateUrl: 'table-head-row.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-table-head-row'
  }
})
export class MyTableHeadRow {

}
