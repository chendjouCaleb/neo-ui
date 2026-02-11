import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren, EmbeddedViewRef,
  inject, IterableChanges,
  QueryList,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MyTableCellDef} from './table-cell-def';
import {MyTableRowDefContext} from './table-row-def';
import {MyBasicTable} from '../basic-table';

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
export class MyTableRow<T> implements AfterContentInit, AfterViewInit {
  private changeDetector = inject(ChangeDetectorRef);
  private _parentTable = inject(MyBasicTable);
  @ContentChildren(MyTableCellDef)
  cellDefList: QueryList<MyTableCellDef>


  @ViewChild('container', {read: ViewContainerRef})
  viewContainerRef: ViewContainerRef;

  private _columns: string[] = [];
  private _initialRenderer: boolean = false;

  constructor(private context: MyTableRowDefContext<T>) {
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit() {
    this.viewContainerRef.clear();
    this.createAllColumn(this._parentTable.columns);
  }

  applyColumnChanges(changes: IterableChanges<string>) {
    this._columns = [];
    changes.forEachItem(item => this._columns.push(item.item));


    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      if (record.previousIndex == null) {
        this._createColumn(record.item, record.currentIndex);
      } else if (record.currentIndex == undefined) {
        this._removeColumnAt(adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex);
      } else if (adjustedPreviousIndex !== null) {
        const view = this.viewContainerRef.get(adjustedPreviousIndex)!;
        this.viewContainerRef.move(view, currentIndex);
      }
    });
    this._initialRenderer = true;
  }

  createAllColumn(columns: string[]) {
    columns.map(column => this.cellDefList.find(cell => cell.name === column))
      .filter(cell => cell != null)
      .forEach(cellDef => {
        if(!cellDef.viewRef){

        }
        cellDef.viewRef = this.viewContainerRef.createEmbeddedView(cellDef.templateRef);
      })
  }

  _createColumn(name: string, index: number) {
    const cellDef = this.cellDefList.find(c => c.name === name);
    if(!cellDef.viewRef) {
      cellDef.viewRef = this.viewContainerRef.createEmbeddedView(cellDef.templateRef, {}, {index});
      cellDef.viewRef.detectChanges();
    }
  }

  _removeColumn(name: string) {
    const cellDef = this.cellDefList.find(c => c.name === name);
    const index = this.viewContainerRef.indexOf(cellDef.viewRef);
    this.viewContainerRef.remove(index);
  }

  _removeColumnAt(index: number) {
    const cellDef = this.viewContainerRef.get(index) as EmbeddedViewRef<any>
    this.viewContainerRef.remove(index);
  }

  showColumn(column: string, index: number) {
    const cellDef = this.cellDefList.find(c => c.name === column);
    if (cellDef.viewRef) {
      this.viewContainerRef.move(cellDef.viewRef, index);
    } else {
      cellDef.viewRef = this.viewContainerRef.createEmbeddedView(cellDef.templateRef, {}, {index});

    }
    cellDef.viewRef.detectChanges();
  }


  hideCell(cellDef: MyTableCellDef) {
    if (cellDef.viewRef) {
      cellDef.viewRef.destroy();
      cellDef.viewRef = null;
    }

  }
}
