import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren, inject, Injector, Input,
  QueryList, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {MyTableHeadRow} from './header';
import {MyTableCellDef, MyTableRowDef, MyTableRowDefContext} from './row';

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
export class MyTable<T> implements AfterViewInit{
  private _injector: Injector = inject(Injector);

  @Input()
  set data(value: T[]) {
    this._data = value;
  }
  get data(): T[] { return this._data; }
  private _data: T[];


  private _visibleColumnNames: string[] = [];

  @ContentChild(MyTableHeadRow)
  headRow: MyTableHeadRow;

  @ContentChild(MyTableRowDef)
  rowDef: MyTableRowDef<T>;




  @ViewChild('rowContainer', {read: ViewContainerRef})
  rowsContainer: ViewContainerRef


  ngAfterViewInit() {
    this._data.forEach((value, index) => {
      const context: MyTableRowDefContext<T> = {
        value,
        index
      }
      const injector = Injector.create({
        parent: this._injector,
        providers: [
          { provide: MyTableRowDefContext, useValue: context
        }]
      })
      const rowView = this.rowsContainer
        .createEmbeddedView(this.rowDef.template, context, {injector});
      rowView.detectChanges();
    })
  }
}
