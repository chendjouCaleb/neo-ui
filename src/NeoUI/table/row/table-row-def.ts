import {
  Directive,
  DoCheck,
  inject,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';


export class MyTableRowDefContext<T> {
  $implicit: T
  index: number
  count: number;
}

@Directive({
  selector: '[MyTableRowDefOf]'
})
export class MyTableRowDef<T> implements OnDestroy, DoCheck {
  public readonly template: TemplateRef<MyTableRowDefContext<T>> = inject(TemplateRef);

  private _changes = new ReplaySubject<IterableChanges<T>>()
  get changes(): Observable<IterableChanges<T>> {
    return this._changes.asObservable();
  }

  private _differ : IterableDiffer<T>

  constructor(private differs : IterableDiffers) {}

  ngDoCheck() {
    if(!this._differ) {
      this._differ = this.differs.find(this.data).create();
    }

    const rowChanges = this._differ.diff(this.data);

    if(rowChanges) {
      this._changes.next(rowChanges);
    }
  }

  ngOnDestroy() {
    this._changes.complete();
  }

  @Input('MyTableRowDefOf')
  data: T[] = [];

  static ngTemplateContextGuard<T>(
    dir: MyTableRowDef<T>,
    ctx: any,
  ): ctx is MyTableRowDefContext<T> {
    return true;
  }
}
