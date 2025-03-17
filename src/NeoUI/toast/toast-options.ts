import {InjectionToken, ViewContainerRef} from '@angular/core';
import {TooltipPosition} from '../toolttip-position';
import {ComponentType} from '@angular/cdk/overlay';
import {ToastContainer} from '../toast/toast-container';
import {Direction} from '@angular/cdk/bidi';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const TOAST_DATA = new InjectionToken<any>('MyToastData');
export const TOAST_DEFAULT_OPTIONS = new InjectionToken<any>('MyToastDefaultOptions');


export class ToastOptions<D = any> {
  /** Data to be injected into the toast content. */
  data?: D | null = null;

  duration: number

  /** Custom class(es) for the overlay panel. */
  panelClass?: string | string[] = 'my-toast-panel';

  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /** The ARIA role of the toast element. */
  role?: string = 'toast';

  /** The Toast position relative to her target. */
  position?: TooltipPosition = 'bottom-center';

  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null = null;

  /** ID of the element that labels the dialog. */
  ariaLabelledBy?: string | null = null;


  /** Aria label to assign to the dialog element */
  ariaLabel?: string | null = null;

  /** Whether the dialog should focus the first focusable element on open. */
  autoFocus?: boolean = true;

  /**
   * Whether the dialog should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean = true;

  /** Component to use as the container for the dialog. */
  containerComponent?: ComponentType<ToastContainer>;

  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;

  /** The width of the toast. */
  width?: string = '';

  /** The height of the toast. */
  height?: string = '';

  /** The minimum width of the toast. */
  minWidth?: string | number = '';

  /** The minimum height of the toast. */
  minHeight?: string | number = '';

  /** The maximum width of the toast. */
  maxWidth?: string | number = '80vw';

  /** The maximum height of the toast. */
  maxHeight?: string | number = '';


  closeOnNavigation?: boolean = true;

  /** The layout direction for the dialog content. */
  direction?: Direction;

}
