import {OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {ToastOptions} from './toast-options';
import {EmbeddedViewRef} from '@angular/core';
import {filter, Observable, Subject, take} from 'rxjs';
import {ToastContainer} from './toast-container';
import {FocusOrigin} from '@angular/cdk/a11y';

let uniqueId = 0;
let counter = 0;

/** Possible states of the lifecycle of a dialog. */
export type ToastState = 'open' | 'closing' | 'closed';

export class ToastRef<T, R = any> {

  /** The instance of component opened into the toast. */
  componentInstance: T


  /** The viewRef of template opened into the toast. */
  embeddedViewRef: EmbeddedViewRef<any>

  /** Subject for notifying the user that the dialog has finished opening. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the dialog has finished closing. */
  private readonly _afterClosed = new Subject<R | undefined>();

  /** Subject for notifying the user that the dialog has started closing. */
  private readonly _beforeClosed = new Subject<R | undefined>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  /** Handle to the timeout that's running as a fallback in case the exit animation doesn't fire. */
  private _closeFallbackTimeout: any;

  _closeTimeoutId: any;

  /** Current state of the toast. */
  private _state: ToastState = 'open'


  get options(): ToastOptions {
    return this._options;
  }


  constructor(private _overlayRef: OverlayRef,
              private _options: ToastOptions,
              public _containerInstance: ToastContainer,
              private count: number = counter++,
              readonly id: string = `my-toast-${uniqueId++}`) {
    _containerInstance._id = id;

    // Emit when opening animation completes
    _containerInstance._animationStateChanged.pipe(
      filter(event => event.state === 'opened'),
      take(1)
    )
      .subscribe(() => {
        this._afterOpened.next();
        this._afterOpened.complete();
      });

    // Dispose overlay when closing animation is complete
    _containerInstance._animationStateChanged.pipe(
      filter(event => event.state === 'closed'),
      take(1)
    ).subscribe(() => {
      clearTimeout(this._closeFallbackTimeout);
      this._finishDialogClose();
    });

    _overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._afterClosed.next(this._result);
      this._afterClosed.complete();
      this.componentInstance = null!;
      this._overlayRef.dispose();
    });

  }

  close(result?: R) {
    this._result = result
    // Transition the backdrop in parallel to the dialog.
    this._containerInstance._animationStateChanged.pipe(
      filter(event => event.state === 'closing'),
      take(1)
    )
      .subscribe(event => {
        this._beforeClosed.next(result);
        this._beforeClosed.complete();
        this._overlayRef.detachBackdrop();

        // The logic that disposes of the overlay depends on the exit animation completing, however
        // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
        // timeout which will clean everything up if the animation hasn't fired within the specified
        // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
        // vast majority of cases the timeout will have been cleared before it has the chance to fire.
        this._closeFallbackTimeout = setTimeout(() => this._finishDialogClose(),
          event.totalTime + 100);
      });

    this._state = 'closing';
    this._containerInstance._startExitAnimation();
  }


  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes: string | string[]): this {
    this._overlayRef.addPanelClass(classes);
    return this;
  }

  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes: string | string[]): this {
    this._overlayRef.removePanelClass(classes);
    return this;
  }

  /** Gets the current state of the toast's lifecycle. */
  getState(): ToastState {
    return this._state;
  }

  /**
   * Finishes the dialog close by updating the state of the toast
   * and disposing the overlay.
   */
  private _finishDialogClose() {
    this._state = 'closed';
    this._overlayRef.dispose();
  }

  /**
   * Updates the dialog's width and height.
   * @param width New width of the toast.
   * @param height New height of the toast.
   */
  updateSize(width: string = '', height: string = ''): this {
    this._overlayRef.updateSize({width, height});
    this._overlayRef.updatePosition();
    return this;
  }


  updatePosition(positionStrategy: PositionStrategy) {
    this._overlayRef.updatePositionStrategy(positionStrategy);
    this._overlayRef.updatePosition()
  }

  get overlayRef(): OverlayRef {
    return this._overlayRef;
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  afterOpened(): Observable<void> {
    return this._afterOpened;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  beforeClosed(): Observable<R | undefined> {
    return this._beforeClosed;
  }

}


export function _closeToastVia<R>(ref: ToastRef<R>, interactionType: FocusOrigin, result?: R) {
  // Some mock dialog ref instances in tests do not have the `_containerInstance` property.
  // For those, we keep the behavior as is and do not deal with the interaction type.
  if (ref._containerInstance !== undefined) {
    ref._containerInstance._closeInteractionType = interactionType;
  }
  return ref.close(result);
}
