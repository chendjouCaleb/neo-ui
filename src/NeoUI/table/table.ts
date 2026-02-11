import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  EmbeddedViewRef,
  inject,
  Injector,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MyTableHeadRow} from './header';
import {MyTableRow, MyTableRowDef, MyTableRowDefContext} from './row';
import {Subject} from 'rxjs';
import {MyBasicTable} from './basic-table';

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
export class MyTable<T> extends MyBasicTable implements AfterViewInit, DoCheck, OnChanges, OnDestroy {
  private _injector: Injector = inject(Injector);
  private _columnDiffer: IterableDiffer<string>
  private _destroy = new Subject<void>();

  constructor(private differs: IterableDiffers) {
    super();
  }

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


  private _firstRowsRenderer: boolean = false;
  ngAfterViewInit() {
    this._columnDiffer = this.differs.find(this.columns).create();

    if (this.columns.length === 0) {
      this.columns = this.headRow.cellDefList.map(c => c.name);
    }

    if (this.rowDef) {
      this.rowDef.changes.subscribe(rowChanges => {
        this._applyChanges(rowChanges);
        this._firstRowsRenderer = true;
      })
    }
  }

  ngDoCheck() {
    const columnChanges = this._columnDiffer?.diff(this.columns);
    if (columnChanges && this._firstRowsRenderer) {

      this._applyColumnChanges(columnChanges);
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  _applyColumnChanges(changes: IterableChanges<string>) {
    if (this.headRow) {
      this.headRow.applyColumnChanges(changes);
    }

    if (this.tableRows) {
      this.tableRows.forEach(row => row.applyColumnChanges(changes));
    }
  }

  _applyChanges(changes: IterableChanges<T>) {
    changes.forEachOperation((operation, adjustedPreviousIndex: number | null) => {
      if (operation.previousIndex == null) {
        this.addRowView(operation.item, operation.currentIndex);
      } else if (operation.currentIndex == undefined) {
        this.removeRowView(adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex);
      } else if (adjustedPreviousIndex !== null) {
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


  private addRowView(value: T, index: number): EmbeddedViewRef<MyTableRowDefContext<T>> {
    const context: MyTableRowDefContext<T> = {
      $implicit: value,
      index,
      count: 0
    };
    const injector = this._createRowInjector(context);
    const rowView = this.rowsContainer
      .createEmbeddedView(this.rowDef.template, context, {injector});
    rowView.detectChanges();
    return rowView;
  }

  private removeRowView(index: number) {
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
    viewRef.context.$implicit = value;
  }


  private _createRowInjector(context: MyTableRowDefContext<T>): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        {provide: MyBasicTable, useValue: this},
        {provide: MyTableRowDefContext, useValue: context}]
    })
  }

  static ngTemplateContextGuard<T extends NgIterable<T>>(
    dir: MyTableRowDef<T>,
    ctx: any,
  ): ctx is MyTableRowDefContext<T> {
    return true;
  }
}
