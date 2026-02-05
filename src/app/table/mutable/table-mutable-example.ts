import {Component} from '@angular/core';
import {
  IconButton, MaterialIcon, MyOption, MySelect,
  MyTable,
  MyTableCell,
  MyTableCellDef,
  MyTableHeadCell,
  MyTableHeadCellDef,
  MyTableHeadRow,
  MyTableRow,
  MyTableRowDef, TextField
} from '../../../NeoUI';


const items = [
  {
    file: { label: "Meeting notes", icon: 'Document' },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: {
      label: "You edited this",
      icon: 'Edit',
    },
  },
  {
    file: { label: "Thursday presentation", icon: 'Folder' },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: 'Open',
    },
  },
  {
    file: { label: "Training recording", icon: 'Video' },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: 'Open',
    },
  },
  {
    file: { label: "Purchase order", icon: 'DocumentPdf' },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: 'People',
    },
  },
];
@Component({
  templateUrl: 'table-mutable-example.html',
  imports: [
    MyTable,
    MyTableCell,
    MyTableCellDef,
    MyTableHeadCell,
    MyTableHeadCellDef,
    MyTableHeadRow,
    MyTableRow,
    MyTableRowDef,
    IconButton,
    MaterialIcon,
    MyOption,
    MySelect,
    TextField
  ],
  selector: 'TableMutableExample, [TableMutableExample]'
})
export class TableMutableExample {
  visibleColumns: string[] = []

  setVisibleColumns(columns: string[]) {
    this.visibleColumns = columns;
  }
  data = [...items ];

  push() {
    this.data.push(...items)
  }

  unshift() {
    this.data.unshift(...items)
  }

  reset(){
    this.data = [...items]
  }

  delete(index: number){
    this.data.splice(index, 1);
  }
}


