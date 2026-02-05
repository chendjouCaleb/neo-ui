import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MyTableCellDef} from '../row';
import {MyTableHeadCellDef} from './table-head-cell-def';

@Component({
  selector: 'MyTableHeadRow',
  template: '<ng-container #container></ng-container>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-table-head-row'
  }
})
export class MyTableHeadRow implements AfterViewInit{
  @ContentChildren(MyTableHeadCellDef)
  cellDefList: QueryList<MyTableHeadCellDef>


  @ViewChild('container', {read: ViewContainerRef})
  viewContainerRef: ViewContainerRef;

  private _visibleColumns: string[] = [];

  ngAfterViewInit() {
    this.updateVisibleColumns(this._visibleColumns);
  }
  setVisibleColumns(columns: string[]) {
    if(!columns || !Array.isArray(columns) || columns.length === 0) {
      this._visibleColumns = this.cellDefList?.map(l => l.name);
    }else {
      this._visibleColumns = columns;
    }

    console.log(this._visibleColumns)
    if(this.cellDefList) {
      this.updateVisibleColumns(this._visibleColumns);
    }
  }

  private updateVisibleColumns(columns: string[]) {

    const cellToHide = this.cellDefList
      .filter(c => !columns.some(column => c.name === column));
    cellToHide.forEach(cell => this.hideCell(cell));

    columns.forEach((column, index) =>{
      this.showColumn(column, index);
    });

  }

  showColumn(column: string, index: number) {
    const cellDef = this.cellDefList.find(c => c.name === column);
    if(cellDef.viewRef){
      this.viewContainerRef.move(cellDef.viewRef, index);
    }else {
      cellDef.viewRef = this.viewContainerRef.createEmbeddedView(cellDef.templateRef, {}, {index});

    }
    cellDef.viewRef.detectChanges();
  }


  hideCell(cellDef: MyTableCellDef) {
    if(cellDef.viewRef) {
      cellDef.viewRef.destroy();
      cellDef.viewRef = null;
    }

  }
}
