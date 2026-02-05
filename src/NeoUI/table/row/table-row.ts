import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  QueryList,
  ViewChild,
  ViewContainerRef,
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
export class MyTableRow<T> implements AfterContentInit, AfterViewInit {
  private changeDetector = inject(ChangeDetectorRef);
  @ContentChildren(MyTableCellDef)
  cellDefList: QueryList<MyTableCellDef>


  @ViewChild('container', {read: ViewContainerRef})
  viewContainerRef: ViewContainerRef;

  private _columns: string[] = [];

  constructor(private context: MyTableRowDefContext<T>) {
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit() {
    this.cellDefList.forEach(cellDef => {
      cellDef.viewRef = this.viewContainerRef.createEmbeddedView(cellDef.templateRef);
    })
  }

  updateVisibleColumns(columns: string[]) {
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
