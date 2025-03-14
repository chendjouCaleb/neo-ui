import {OverlayRef} from '@angular/cdk/overlay';
import {PopoverOptions} from './popover-options';
import {EmbeddedViewRef} from '@angular/core';

let uniqueId = 0;

export class PopoverRef<T, R = any> {

  /** The instance of component opened into the toast. */
  componentInstance: T

  /** The viewRef of template opened into the popover. */
  embeddedViewRef: EmbeddedViewRef<any>

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  get options(): PopoverOptions { return this._options; }
  get trigger(): HTMLElement { return this._trigger }

  constructor(private _overlayRef: OverlayRef,
              private _options: PopoverOptions,
              private _trigger: HTMLElement,
              readonly id: string = `my-popover-${uniqueId++}`) {
  }

  close(result?: R) {
    this._result = result
    this._overlayRef.detach()
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

  get overlayRef(): OverlayRef {
    return this._overlayRef;
  }
}
