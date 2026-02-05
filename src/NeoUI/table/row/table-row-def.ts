import {Directive, TemplateRef} from '@angular/core';


export class MyTableRowDefContext<T> {
  value: T
  index: number
  count: number;
}

@Directive({
  selector: '[MyTableRowDef]'
})
export class MyTableRowDef<T> {
    constructor(public readonly template: TemplateRef<MyTableRowDefContext<T>>) {
    }
}
