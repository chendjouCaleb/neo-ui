import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  inject,
  Input, OnDestroy, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {_IdGenerator} from '@angular/cdk/a11y';
import {Observable, Subject} from 'rxjs';
import {hasModifierKey} from '@angular/cdk/keycodes';

/** Event object emitted by Tab when selected or deselected. */
export class MyTabRowItemActiveStateChange {
  constructor(
    /** Reference to the tab that emitted the event. */
    public source: TabRowItem,
    /** Whether the change in the tab's value was a result of a user action. */
    public isUserInput = false,
  ) {
  }
}

@Component({
  templateUrl: 'tabRowItem.html',
  selector: 'button[TabRowItem], button[MyTabRowItem]',
  standalone: true,
  styleUrls: ['tabRow.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tab-row-item',
    '[class.active]': 'active',
    '[class.disabled]': 'disabled',
    '[disabled]': 'disabled',
    '[attr.name]': 'name',
    '[attr.aria-selected]': 'active',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    'role': 'tab',
    '(click)': '_selectViaInteraction()',
    '(keydown)': '_handleKeydown($event)',
    '(mouseenter)': '_handleMouseenter()',
    '(mouseleave)': '_handleMouseleave()',
    '(blur)': '_handleBlur()',
    '(focus)': '_handleFocus()'
  }
})
export class TabRowItem implements OnDestroy, AfterViewInit {
  private _idGenerator = inject(_IdGenerator);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('innerBox')
  innerBox: ElementRef<HTMLElement> | undefined;

  /**
   * Custom ID for the tab, overriding the auto-generated one.
   * Note that when using this input, it's your responsibility to ensure that the ID is unique.
   */
  @Input()
  id: string = this._idGenerator.getId('tab-row-item');

  /** Whether the tab is currently active. */
  get active(): boolean { return this._active; }
  private _active: boolean = false;

  /** Whether the tab is currently focused. */
  get focused(): boolean { return this._focused; }
  private _focused: boolean;

  /** Whether the tab is currently hovered. */
  get hovered(): boolean { return this._hovered; }
  private _hovered: boolean;

  /** whether the tab is disabled. */
  @Input()
  disabled: boolean = false;

  /** Aria label for the tab. */
  @Input('aria-label')
  ariaLabel: string

  /** Reference to the element that the tab is labelled by. Will be cleared if aria-label is set at the same time. */
  @Input('aria-labelledby')
  ariaLabelledby: string;

  /** The unique name of the tab inside a TabRow */
  @Input()
  name: string = '';

  get tabindex(): number {
    return this.active || this.focused ? 0 : -1;
  }

  @Output()
  activeStateChange = new EventEmitter<MyTabRowItemActiveStateChange>();

  private _destroy = new Subject<void>();
  private _stateChanges = new Subject<void>();
  private _focusChanges = new Subject<TabRowItem>();

  get stateChanges(): Observable<void> {
    return this._stateChanges.asObservable();
  }

  get focusChanges(): Observable<TabRowItem> {
    return this._focusChanges.asObservable();
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit() {
    this._stateChanges.next();
  }

  ngOnDestroy() {
    this._stateChanges.complete();
    this._destroy.next();
    this._destroy.complete();
  }

  get host(): HTMLElement {
    return this.elementRef.nativeElement
  }

  get innerBoxHost(): HTMLElement {
    return this.innerBox?.nativeElement!
  }

  select(emitEvent: boolean) {
    if (this.active) return;
    this._enableFocus();
    this._active = true;
    this._changeDetectorRef.markForCheck();
    if (emitEvent) {
      this._emitActiveStateChangeEvent();
    }
  }

  deselect(emitEvent: boolean) {
    if (!this._active) return;

    this._active = false;
    this._disableFocus();
    this._changeDetectorRef.markForCheck();
    if (emitEvent) {
      this._emitActiveStateChangeEvent();
    }
  }

  _selectViaInteraction() {
    if(this.active || this.disabled) return;
    this._enableFocus();
    this._active = true;
    this._emitActiveStateChangeEvent(true);
    this._changeDetectorRef.markForCheck();
    this._stateChanges.next();
    this._focusChanges.next(this);
  }


  focus(options?: FocusOptions) {
    if(this.disabled || this.focused) return;

    this._enableFocus();
    this.host.focus(options);

  }

  _handleBlur() {
    if(!this.active){
      this._disableFocus();
    }

    this._focused = false;
    this._changeDetectorRef.markForCheck();
    this._stateChanges.next();
    //this._focusChanges.next(this);
  }

  _handleFocus(){
    this._focused = true;
    this._changeDetectorRef.markForCheck();
    this._stateChanges.next();
    this._focusChanges.next(this);
  }

  /** Ensures the option is selected when activated from the keyboard. */
  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !hasModifierKey(event)) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  _handleMouseenter(){
    //if(this.hovered) return;
    this._hovered = true;
    this._stateChanges.next();
  }

  _handleMouseleave() {
    //if(!this.hovered) return;
    this._hovered = false;
    this._stateChanges.next();
  }

  _enableFocus(){
    this.host.setAttribute('tabindex', '0');
  }

  _disableFocus(){
    this.host.setAttribute('tabindex', '-1');
  }

  /** Emits the selection change event. */
  private _emitActiveStateChangeEvent(isUserInput = false): void {
    this.activeStateChange.emit(new MyTabRowItemActiveStateChange(this, isUserInput));
  }
}
