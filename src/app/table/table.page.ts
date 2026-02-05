import {Component} from '@angular/core';
import {
  MyOption,
  MySelect,
  MyTable,
  MyTableCellDef,
  MyTableHeadCell, MyTableHeadCellDef,
  MyTableHeadRow,
  MyTableRow,
  MyTableRowDef,
  TextField
} from '../../NeoUI';
import {MyTableCell} from '../../NeoUI';
import {FormsModule} from '@angular/forms';
import {BasicTableExample} from './basic/basic-table-example';
import {TableMutableExample} from './mutable/table-mutable-example';

@Component({
  selector: 'TablePage',
  imports: [
    MyTable,
    MyTableHeadRow,
    MyTableHeadCell,
    MyTableRow,
    MyTableRowDef,
    MyTableCell,
    MyTableCellDef,
    TextField,
    MySelect,
    MyOption,
    FormsModule,
    MyTableHeadCellDef,
    BasicTableExample,
    TableMutableExample
  ],

  templateUrl: 'table.page.html'
})
export class TablePage {



}
