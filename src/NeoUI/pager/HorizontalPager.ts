import {
  AfterContentInit, AfterViewInit,
  Component, ComponentFactoryResolver, ComponentRef,
  ContentChildren, ElementRef,
  forwardRef, Injector, Input,
  QueryList, StaticProvider,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {PageContentDef, PageContext} from './page-content-ref';
import {PageContent} from './pageContent';
import {MsMotionSlideDir, MsMotionTimings} from '../motion';
import {MsMotionFunction} from './pager-motion';

@Component({
  templateUrl: 'HorizontalPager.html',
  selector: 'HorizontalPager',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['pager.scss'],
  host: {
    class: 'horizontal-pager'
  }
})
export class HorizontalPager implements AfterViewInit {
  private _initialized: boolean = false;

  @ContentChildren(forwardRef(() => PageContentDef))
  pageList: QueryList<PageContentDef> | undefined;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @ViewChild('layout')
  layout: ElementRef<HTMLDivElement>;

  boxHeight: number = 0;

  private _currentContentDef: PageContentDef

  @Input()
  set selectedIndex(index: number) {
    if(this._initialized) {
      this.selectIndex(index, true)
    }else {
      this._selectedIndex = index
    }
  }
  get selectedIndex(): number { return this._selectedIndex }
  private _selectedIndex: number = 0;


  constructor(private _elementRef: ElementRef<HTMLElement>,
              private parentInjector: Injector,

  ) {
  }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.selectIndex(this._selectedIndex, false)
      this._initialized = true
    })
  }

  selectIndex(index: number, animate: boolean = true) {
    if(index < 0 || index > this.pageList!.length - 1) {
      throw new Error("Index is out of bounds")
    }

    if(this._currentContentDef != null) {
      this.hideCurrent(index).then()
    }


    const contentDef = this.pageList!.get(index)!;

    let contentRef = contentDef.contentCache;
    if(contentRef == null){
      contentRef = this._createContent(index, contentDef);
      contentDef.contentCache = contentRef;
    }else{
      contentDef.contentCache.instance.host.classList.remove('hidden')
    }
    if(animate) {
      this.animatePageIn(contentDef.contentCache.instance, index).then()
    }
    this.boxHeight = contentDef.contentCache.instance.host.offsetHeight

    this._selectedIndex = index;
    this._currentContentDef = contentDef
  }

  async hideCurrent(index: number):Promise<void> {
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

  async animatePageIn(page: PageContent, index: number) {
    const dir = index < this.selectedIndex ? 'ltr' : 'rtl';
    return MsMotionFunction.slideIn(page.host, {
      dir,
      duration: 300,
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
    const contentRef = this.container.createComponent<PageContent>(PageContent, { index: 0, injector})
    contentRef.changeDetectorRef.detectChanges();
    return contentRef;
  }

  private _createInjector(index: number, content: PageContentDef): Injector {
    const context = new PageContext(index, this.pageList!.length);

    const providers: StaticProvider[] = [
      {provide: PageContext, useValue: context},
      {provide: PageContentDef, useValue: content}
    ];

    return Injector.create({parent: this.parentInjector, providers});
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
