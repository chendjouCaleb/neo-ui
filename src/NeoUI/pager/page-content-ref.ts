import {ComponentRef, Directive, TemplateRef} from '@angular/core';
import {PageContent} from './pageContent';


export class PageContext {
  odd: boolean;
  even: boolean;
  first: boolean;
  last: boolean;

  constructor(public index: number, total: number) {
    this.odd = index % 2 === 1;
    this.even = !this.odd;
    this.first = index === 0;
    this.last = index === total - 1;
  }
}


@Directive({
  standalone: true,
  selector: '[PageDef]'
})
export class PageContentDef {

  contentCache: ComponentRef<PageContent>

  constructor(public template: TemplateRef<PageContext>) {
  }
}
