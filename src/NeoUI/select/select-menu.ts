import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component, ContentChildren,
  EventEmitter, forwardRef,
  Input,
  Output, QueryList,
  ViewEncapsulation
} from "@angular/core";
import {SelectionModel} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {SelectMenuItem} from './select-menu-item';

@Component({
  templateUrl: 'select-menu.html',
  selector: 'MySelectMenu, [MySelectMenu]',
  styleUrl: 'select-menu.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-select-menu'
  }
})
export class SelectMenu {
  // private _initialized: boolean = false;
  // private _selectionModel:SelectionModel<any>;
  //
  // @Input()
  // multiple : boolean = false
  //
  // @Input()
  // set values(values: any[]) {
  //   if(this._initialized) {
  //     this._selectionModel.select(...values);
  //     this._values = values;
  //   }else {
  //     this._values = values;
  //   }
  // }
  // get values(): any[] {
  //   return this._values;
  // }
  // private _values: any[] = [];
  //
  // @Output()
  // get onChange(): Observable<boolean> {
  //   return this._onChange.asObservable();
  // }
  // private _onChange = new EventEmitter<boolean>();
  //
  // @ContentChildren(forwardRef(() => SelectMenuItem))
  // menuItems: QueryList<SelectMenuItem>
  //
  // ngAfterContentInit(): void {
  //   this._initialized = true;
  //   this._selectionModel = new SelectionModel(this.multiple);
  //   this._selectionModel.select(...this._values);
  //
  //   this.menuItems.forEach(item => {
  //     item.checked = this._selectionModel.isSelected(item.value)
  //   })
  //
  // }
}
