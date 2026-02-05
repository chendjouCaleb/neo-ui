import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren, DoCheck,
  EmbeddedViewRef, inject, Injector, Input, IterableChangeRecord,
  IterableChanges, IterableDiffer, IterableDiffers, NgIterable, OnChanges,
  QueryList, SimpleChanges, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MyTableHeadRow} from './header';
import {MyTableCellDef, MyTableCellDefContext, MyTableRow, MyTableRowDef, MyTableRowDefContext} from './row';

@Component({
  selector: 'MyTable',
  templateUrl: 'table.html',
  styleUrl: 'table.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'my-table',
    'role': 'table',
  }

})
export class MyTable<T> implements AfterViewInit, DoCheck, OnChanges {
  private _injector: Injector = inject(Injector);
  private _differ : IterableDiffer<T>
  private _columnDiffer: IterableDiffer<string>

  constructor(private differs : IterableDiffers) {
  }

  @Input()
  data: T[];

  @Input()
  columns: string[] = []

  @ContentChild(MyTableHeadRow)
  headRow: MyTableHeadRow;

  @ContentChild(MyTableRowDef)
  rowDef: MyTableRowDef<T>;

  @ContentChildren(MyTableRow)
  tableRows: QueryList<MyTableRow<T>>


  @ViewChild('rowContainer', {read: ViewContainerRef})
  rowsContainer: ViewContainerRef


  ngAfterViewInit() {
    this._differ = this.differs.find(this.data).create();
    this._columnDiffer = this.differs.find(this.columns).create();

    if(this.columns.length === 0){
      this.columns = this.headRow.cellDefList.map(c => c.name);
    }
  }

  ngDoCheck() {
    const columnChanges = this._columnDiffer?.diff(this.columns);
    if(columnChanges) {
      console.log('column change')
      this._applyColumnChanges(columnChanges);
    }
    let rowChanges = this._differ?.diff(this.data);
    if (rowChanges != null) {
      console.log('row change')
      this._applyChanges(rowChanges);
    }
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  _applyColumnChanges(changes: IterableChanges<string>) {
    if(this.headRow){
      this.headRow.applyColumnChanges(changes);
    }
  }

  _applyChanges(changes: IterableChanges<T>) {
    changes.forEachOperation((operation, adjustedPreviousIndex: number | null) => {
      if(operation.previousIndex == null){
        this.addRowView(operation.item, operation.currentIndex);
      }
      else if(operation.currentIndex == undefined) {
        this.removeRowView(adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex);
      }else if(adjustedPreviousIndex !== null){
        this.moveRowView(operation.item, adjustedPreviousIndex, operation.currentIndex);
      }
    });

    for (let i = 0, ilen = this.rowsContainer.length; i < ilen; i++) {
      const viewRef = this._getViewRef(i);
      const context = viewRef.context;
      context.index = i;
      context.count = ilen;
      //context.ngForOf = this._ngForOf!;
    }

  }

  changeVisibleColumns(columnNames: string[]) {
    columnNames = columnNames || [];
    this.columns = columnNames;

    if(this.headRow) {
      this.headRow.setVisibleColumns(columnNames);
    }
    if(this.tableRows){
      this.tableRows.forEach(row => {
        row.updateVisibleColumns(columnNames);
      });
    }
  }

  render() {
    //this.headRow.setVisibleColumns(this._visibleColumns);
  }

  private addRowView(value: T, index: number): EmbeddedViewRef<MyTableRowDefContext<T>> {
    const context: MyTableRowDefContext<T> = {
      value: value,
      index,
      count: 0
    };
    const injector = this._createRowInjector(context);
    const rowView = this.rowsContainer
      .createEmbeddedView(this.rowDef.template, context, {injector});
    rowView.detectChanges();
    return rowView;
  }

  private removeRowView(index: number){
    this.rowsContainer.remove(index);
  }

  private moveRowView(value: T, previousIndex: any, currentIndex: number) {
    const view = this._getViewRef(previousIndex);
    this.rowsContainer.move(view, currentIndex);
    this._applyViewChange(view, value);
  }

  _getViewRef(index: number): EmbeddedViewRef<MyTableRowDefContext<T>> {
    return this.rowsContainer.get(index) as EmbeddedViewRef<MyTableRowDefContext<T>>;
  }

  _applyViewChange(viewRef: EmbeddedViewRef<MyTableRowDefContext<T>>, value: T) {
    viewRef.context.value = value;
  }


  private _createRowInjector(context: MyTableRowDefContext<T>): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        { provide: MyTableRowDefContext, useValue: context }]
    })
  }

}
