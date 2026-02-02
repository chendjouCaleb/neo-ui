import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentRef,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  Output,
  QueryList,
  StaticProvider,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {HorizontalPageContext, PageContentDef} from './page-content-ref';
import {PageContent} from './pageContent';
import {MsMotionSlideDir, MsMotionSlideOptions, MsMotionTimings} from '../motion';
import {MsMotionFunction} from './pager-motion';
import {Subject} from 'rxjs';

export type PageChangeDir = 'ltr' | 'rtl';

@Component({
  templateUrl: 'HorizontalPager.html',
  selector: 'HorizontalPager',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['pager.scss'],
  exportAs: 'pager',
  host: {
    class: 'horizontal-pager'
  }
})
export class HorizontalPager implements AfterViewInit, OnDestroy, AfterContentInit {
  private _initialized = new Subject<void>();
  private _destroy = new Subject<void>();
  private _stateChanges = new Subject<void>();


  @ContentChildren(forwardRef(() => PageContentDef))
  pageList: QueryList<PageContentDef> | undefined;

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  @ViewChild('layout')
  layout: ElementRef<HTMLDivElement>;

  boxHeight: number = 0;

  private _currentContentDef: PageContentDef

  @Input()
  set selectedIndex(index: number) {
    this.selectIndex(index, true)
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  private _selectedIndex: number = 0;

  @Input()
  set selectedName(name: string) {
    this.selectName(name);
  }

  get selectedName(): string {
    return this._selectedName;
  }

  private _selectedName: string = '';

  @Output()
  pageChange = new EventEmitter<void>();


  constructor(private _elementRef: ElementRef<HTMLElement>,
              private parentInjector: Injector) {
  }

  ngAfterViewInit() {

    Promise.resolve().then(() => {
      this._initialized.next();
      this._initialized.complete();


      // if (this.selectedName) {
      //   this.selectName(this.selectedName);
      // } else {
      //   this.selectIndex(this.selectedIndex);
      // }
    })
  }

  ngAfterContentInit() {
  }

  ngOnDestroy() {
    this._destroy.next();
    this._stateChanges.complete();
    this._destroy.complete();
  }


  selectName(name: string) {
    const contentDef = this._getPageDefByName(name);
    this.selectPage(contentDef);
  }

  selectIndex(index: number, animate: boolean = true) {
    if (index < 0 || index > this.pageList!.length - 1) {
      throw new Error("Index is out of bounds")
    }

    const contentDef = this.pageList!.get(index)!;
    this.selectPage(contentDef);

  }

  selectPage(contentDef: PageContentDef, animate: boolean = true) {
    let dir: PageChangeDir = 'ltr';
    const index = this._getPageIndex(contentDef);
    if (this._currentContentDef != null) {

      const currentPageIndex = this._getPageIndex(this._currentContentDef);
      dir = currentPageIndex > index ? 'rtl' : 'ltr'
      this.hidePage(this._currentContentDef, dir).then(() => {

      });
      console.log('hide')
    }

    let contentRef = contentDef.contentCache;
    if (contentRef == null) {
      contentRef = this._createContent(index, contentDef);
      contentDef.contentCache = contentRef;
    }
    contentDef.contentCache.instance.show();
    contentDef.contentCache.changeDetectorRef.detectChanges();
    if (animate) {
      this.animatePageIn(contentDef.contentCache.instance, index).then();
    }
    this.boxHeight = contentDef.contentCache.instance.host.offsetHeight;

    this._selectedIndex = index;
    this._currentContentDef = contentDef;
  }

  async hideCurrent(index: number): Promise<void> {
    const dir = index < this.selectedIndex ? 'ltr' : 'rtl';
    const contentDef = this._currentContentDef;
    const host = contentDef.contentCache.instance.host;
    host.classList.add('hidden');
    return MsMotionFunction.slideOut(host, {
      dir,
      duration: 300,
      delay: 0,
      easing: MsMotionTimings.decelerate
    });
  }

  async hidePage(contentDef: PageContentDef, dir: 'ltr' | 'rtl'): Promise<void> {
    const host = contentDef.contentCache.instance.host;

    await  pageAnimateHide(host, {
      dir,
      duration: 3000,
      delay: 0,
      easing: MsMotionTimings.decelerate
    });
    contentDef.contentCache.instance.hide();
    contentDef.contentCache.changeDetectorRef.detectChanges();
  }

  async animatePageIn(page: PageContent, index: number) {
    const dir = index < this.selectedIndex ? 'ltr' : 'rtl';
    return MsMotionFunction.slideIn(page.host, {
      dir,
      duration: 3000,
      delay: 50,
      easing: MsMotionTimings.decelerate
    });
  }

  get width(): number {
    return this.host.offsetWidth;
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  hasNext(): boolean {
    return this._selectedIndex < this.length() - 1;
  }

  hasPrev(): boolean {
    return this.selectedIndex > 0;
  }

  length(): number {
    return this.pageList!.length;
  }

  private _createContent(index: number, content: PageContentDef): ComponentRef<PageContent> {
    const injector = this._createInjector(index, content);
    const contentRef = this.container.createComponent<PageContent>(PageContent, {index: 0, injector})
    contentRef.changeDetectorRef.detectChanges();
    return contentRef;
  }

  private _createInjector(index: number, content: PageContentDef): Injector {
    const context = new HorizontalPageContext(index, this.pageList!.length);

    const providers: StaticProvider[] = [
      {provide: HorizontalPageContext, useValue: context},
      {provide: PageContentDef, useValue: content}
    ];

    return Injector.create({parent: this.parentInjector, providers});
  }

  _getPageIndex(contentDef: PageContentDef): number {
    return this.pageList.toArray().findIndex(page => page === contentDef);
  }

  _getPageDefByName(name: string): PageContentDef | undefined {
    return this.pageList.find(p => p.PageDefName.toLowerCase() === name.toLowerCase());
  }

  private _animateContentOut(host: HTMLElement, dir: MsMotionSlideDir): Promise<void> {
    return MsMotionFunction.slideOut(host, {
      dir,
      duration: 300,
      delay: 0,
      easing: MsMotionTimings.decelerate
    });
  }

  private _animateContentIn(host: HTMLElement, dir: MsMotionSlideDir): Promise<void> {
    return MsMotionFunction.slideIn(host, {
      dir,
      duration: 300,
      delay: 50,
      easing: MsMotionTimings.decelerate
    });
  }
}


function pageAnimateHide(host: HTMLElement, options: MsMotionSlideOptions): Promise<void> {
  const keyframes = [
    {transform: 'scale3d(1, 1, 1)', opacity: 1},
    {transform: 'scale3d(0.9, 0.9, 1)', opacity: 0}
  ]

  return new Promise<void>(resolve => {
    host.animate(keyframes, {duration: options.duration, delay: options.delay, easing: options.easing})
      .onfinish = () => {
      resolve();
    }
  });
}
