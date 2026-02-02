import {ChangeDetectionStrategy, Component, Directive, TemplateRef, ViewEncapsulation} from '@angular/core';


export class MyTableRowDefContext<T> {
  value: T
  index: number
}

@Directive({
  selector: '[MyTableRowDef]'
})
export class MyTableRowDef<T> {
    constructor(public readonly template: TemplateRef<MyTableRowDefContext<T>>) {
    }
}
