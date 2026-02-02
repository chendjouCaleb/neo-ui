import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren, EventEmitter, inject,
  Input,
  OnDestroy, Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {MyTabRowItemActiveStateChange, TabRowItem} from './tabRowItem';
import {defer, filter, merge, Observable, startWith, Subject, switchMap, takeUntil} from 'rxjs';
import {hasModifierKey} from '@angular/cdk/keycodes';
import {_IdGenerator} from '@angular/cdk/a11y';

@Component({
  templateUrl: 'tabRow.html',
  selector: 'TabRow',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['tabRow.scss'],
  exportAs: 'tabRow',
  host: {
    class: 'tab-row',
    'role': 'tablist',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '[id]': 'id',
    '(keydown)': '_handleKeydown($event)',
  }
})
export class TabRow implements AfterContentInit, OnDestroy {
  private _changeDetectorRef = inject(ChangeDetectorRef);

  private _initialize = new Subject<void>()
  private _destroy = new Subject<void>();
  private _stateChanges = new Subject<void>();

  /**
   * Custom ID for the tab, overriding the auto-generated one.
   * Note that when using this input, it's your responsibility to ensure that the ID is unique.
   */
  @Input()
  id: string = inject(_IdGenerator).getId('tab-row');

  /** Reference to the element that the tab is labelled by. Will be cleared if aria-label is set at the same time. */
  @Input('aria-labelledby')
  ariaLabelledby: string;


  @ContentChildren(TabRowItem)
  tabRowItems: QueryList<TabRowItem> | undefined = undefined;

  get length(): number {
    return this.tabRowItems.length;
  }

  @Output()
  change = new EventEmitter<TabRowItem>();

  innerBox: DOMRect | undefined
  outerBox: DOMRect | undefined
  isHover: boolean = false

  thumbLeft: number = 0;
  thumbWidth: number = 0;

  private _activeTabRowItem: TabRowItem

  private readonly activeStateChange: Observable<MyTabRowItemActiveStateChange> = defer(() => {
    if (this.tabRowItems) {
      return this.tabRowItems.changes.pipe(
        startWith(this.tabRowItems),
        switchMap(() => merge(...this.tabRowItems.map(item => item.activeStateChange))),
        filter(t => t.source.active)
      );
    }

    return this._initialize.pipe(switchMap(() => this.activeStateChange))
  });

  private readonly domStateChanges: Observable<void> = defer(() => {
    if (this.tabRowItems) {
      return this.tabRowItems.changes.pipe(
        startWith(this.tabRowItems),
        switchMap(() => merge(...this.tabRowItems.map(item => item.stateChanges), this._stateChanges))
      );
    }
    return this._initialize.pipe(switchMap(() => this.domStateChanges));
  });

  private readonly focusChanges: Observable<TabRowItem> = defer(() => {
    if (this.tabRowItems) {
      return this.tabRowItems.changes.pipe(
        startWith(this.tabRowItems),
        switchMap(() => merge(...this.tabRowItems.map(item => item.focusChanges)))
      );
    }
    return this._initialize.pipe(switchMap(() => this.focusChanges));
  });


  @Input()
  set selectedIndex(index: number) {
    this._selectedIndex = index;
    this.activateByIndex(index);
  }

  get selectedIndex(): number {
    return this._selectedIndex
  }

  _selectedIndex: number = 0

  @Input()
  set selectedName(value: string) {
    this._selectedName = value;
    this.activateTabByName(value);
  }

  get selectedName(): string {
    return this._selectedName
  }
  _selectedName: string = '';

  _focusedIndex: number;
  get focusedIndex(): number { return this._focusedIndex; }


  constructor() {
    this.activeStateChange.subscribe(event => {

    })
  }


  ngAfterContentInit(): void {
    this._stateChanges.next();
    this._initialize.next();
    this._initialize.complete();

    this.tabRowItems.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._reset();

      Promise.resolve().then(() => {
        if (this._selectedName) {
          this.activateTabByName(this.selectedName);
        } else {
          this.activateByIndex(this.selectedIndex);
        }
      });
    });

  }

  ngOnDestroy() {
    this._destroy.complete();
    this._stateChanges.complete();
  }

  _reset() {
    const changeOrDestroyed = merge(this.tabRowItems.changes, this._destroy);

    this.activeStateChange.pipe(takeUntil(changeOrDestroyed)).subscribe(item => {
      this.activateTabRowItem(item.source);
    });

    this.domStateChanges.pipe(takeUntil(changeOrDestroyed)).subscribe(() => {
      if (this._activeTabRowItem) {
        this._moveThumbRect(this._activeTabRowItem);
        this._changeDetectorRef.markForCheck();
      }
    });

    this.focusChanges.pipe(takeUntil(changeOrDestroyed)).subscribe((t) => {
      this._focusedIndex = this._indexOf(t);
      console.log(t.host.innerText)
    })
  }

  activateTabRowItem(tabItem: TabRowItem) {
    if (this._activeTabRowItem === tabItem) return;

    this._activeTabRowItem = tabItem;

    this.tabRowItems
      .filter(item => item != tabItem)
      .forEach(tabItem => tabItem.deselect(true));

    this._moveThumbRect(tabItem);
    this._changeDetectorRef.markForCheck();
    this.change.emit(tabItem);
  }


  activateByIndex(index: number) {
    if (this.tabRowItems) {
      index = this._coerceIndex(index, this.tabRowItems.length);
      this._selectedIndex = index;
      const tabRowItem = this._getTabByIndex(index);
      tabRowItem.select(true);
    } else {
      this._selectedIndex = index;
    }
  }



  _indexOf(tabItem: TabRowItem): number {
    return this.tabRowItems.toArray().findIndex(t => t.id === tabItem.id);
  }

  private _coerceIndex(index: number, arrayLength: number) {
    if (index < 0) return 0;
    if (index >= arrayLength) return arrayLength - 1;
    return index
  }

  activateTabByName(name: string) {
    this._selectedName = name;
    if (this.tabRowItems) {
      const tab = this._getTabByName(name);
      if (!tab) {
        throw new Error(`TabRowItem with name='${name}' not found in this tabRow.`);
      }
      this.activateTabRowItem(tab);
    }
  }


  _getTabByName(name: string): TabRowItem {
    return this.tabRowItems.find(t => t.name && t.name.toUpperCase() === name.toUpperCase());
  }

  _getTabByIndex(index: number): TabRowItem {
    index = index >= this.tabRowItems.length ? this.tabRowItems.length - 1 : index;
    return this.tabRowItems.get(index);
  }


  _moveThumbRect(tabRowItem: TabRowItem) {
    this.thumbLeft = this._getThumbLeft(tabRowItem);
    this.thumbWidth = this._getThumbWidth(tabRowItem);
  }

  _getThumbLeft(tabRowItem: TabRowItem): number {
    if (tabRowItem.hovered || tabRowItem.focused) {
      return tabRowItem.host.offsetLeft!;
    }
    return tabRowItem.innerBoxHost?.offsetLeft! || 0;
  }

  _getThumbWidth(tabRowItem: TabRowItem): number {
    if (tabRowItem.hovered || tabRowItem.focused) {
      return tabRowItem.host.offsetWidth!
    }
    return tabRowItem.innerBoxHost?.offsetWidth! || 0;
  }

  focusIndex(index: number){
    if (this.tabRowItems) {
      index = this._coerceIndex(index, this.tabRowItems.length);
      const tabRowItem = this._getTabByIndex(index);
      tabRowItem.focus();
    }
  }

  focusNext() {
    if (this.focusedIndex === this.tabRowItems.length - 1) {
      this.focusIndex(0);
    } else {
      this.focusIndex(this.focusedIndex + 1)
    }
  }

  focusPrev() {
    if (this.focusedIndex === 0) {
      this.focusIndex(this.length - 1);
    } else {
      this.focusIndex(this.focusedIndex - 1)
    }
  }

  _handleKeydown(event: KeyboardEvent): void {
    console.log(event.key)
    if (!hasModifierKey(event)) {
      if(event.key === 'Home'){
        this._keyHome();
      }else if(event.key === 'End') {
        this._keyEnd();
      }else if(event.key === 'ArrowLeft') {
        this._keyLeftArrow();
      }else if(event.key === 'ArrowRight') {
        this._keyRightArrow();
      }else if(event.key === 'Tab') {
        this._keyTab();
      }

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /**
   * When focus moves into the tab list, places focus on the active tab element.
   * When the tab list contains the focus, moves focus to the next element in the tab sequence
   */
  _keyTab() {

  }


  /**
   * When a tab has focus:
   * - Moves focus to the next tab.
   * - If focus is on the last tab, moves focus to the first tab.
   */
  _keyRightArrow() {
    this.focusNext();
  }

  /**
   * When a tab has focus :
   * - Moves focus to the previous tab.
   * - If focus is on the first tab, moves focus to the last tab.
   */
  _keyLeftArrow() {
    this.focusPrev();
  }

  /**
   * When a tab has focus, moves focus to the first tab.
   */
  _keyHome() {
    if (this.tabRowItems) {
      this.activateByIndex(0);
    }
  }

  /**
   * When a tab has focus, moves focus to the last tab.
   */
  _keyEnd() {
    if (this.tabRowItems) {
      this.activateByIndex(this.tabRowItems.length - 1);
    }
  }
}
