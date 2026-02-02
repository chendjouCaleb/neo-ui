import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {PageContentDef, HorizontalPageContext} from './page-content-ref';

@Component({
  template: `
    <ng-container #element></ng-container>`,
  selector: 'PageContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'class': 'page-content',
    '[class.my-page-hidden]' : '!visible'
  }
})
export class PageContent implements AfterViewInit {
  @ViewChild('element', {read: ViewContainerRef})
  view: ViewContainerRef;

  @ViewChild('layout')
  layoutRef: ElementRef<HTMLElement>;

  protected visible: boolean = true;


  constructor(private _contentDef: PageContentDef,
              private _elementRef: ElementRef<HTMLElement>,
              private _changeDetector: ChangeDetectorRef,
              private _context: HorizontalPageContext) {
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

  hide() {
    this.visible = false;
    this._changeDetector.markForCheck();
  }

  show() {
    this.visible = true;
    this._changeDetector.markForCheck();
  }

  getHeight(): number {
    return this.host.offsetHeight;
  }
}
