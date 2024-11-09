import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {PageContentDef, PageContext} from './page-content-ref';

@Component({
  template: `
    <div class="page-content-container" #layout>
      <ng-container #element></ng-container>
    </div>`,
  selector: 'PageContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'class': 'page-content'
  }
})
export class PageContent implements AfterViewInit {
  @ViewChild('element', {read: ViewContainerRef})
  view: ViewContainerRef;

  @ViewChild('layout')
  layoutRef: ElementRef<HTMLElement>;


  constructor(private _contentDef: PageContentDef,
              private _elementRef: ElementRef<HTMLElement>,
              private _context: PageContext) {
  }

  ngAfterViewInit(): void {
    //this._resizeObserver.observe(this.layoutHost);
    this.view.clear();
    this.view.createEmbeddedView(this._contentDef.template, this._context, 0);
  }

  ngOnDestroy(): void {
    this.view.clear();
    //this._resizeObserver.disconnect();
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get layoutHost(): HTMLElement {
    return this.layoutRef.nativeElement;
  }
}
