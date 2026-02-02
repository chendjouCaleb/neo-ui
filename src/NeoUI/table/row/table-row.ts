import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MyTableCellDef} from './table-cell-def';
import {MyTableRowDefContext} from './table-row-def';

@Component({
  selector: 'MyTableRow',
  templateUrl: 'table-row.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'my-table-row',
    role: 'row'
  }
})
export class MyTableRow<T> implements AfterContentInit, AfterViewInit{
  @ContentChildren(MyTableCellDef)
  cellDefList: QueryList<MyTableCellDef>

  @ViewChild('container', {read: ViewContainerRef})
  viewContainerRef: ViewContainerRef

  constructor(private context: MyTableRowDefContext<T>) {
  }

  ngAfterContentInit(): void {

  }
  ngAfterViewInit() {
    this.cellDefList.forEach(cellDef => {
      this.viewContainerRef.createEmbeddedView(cellDef.templateRef)
    })
  }
}
