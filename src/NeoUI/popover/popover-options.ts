import {ComponentType} from '@angular/cdk/overlay';
import {PopoverContainer} from './popover-container';
import {Direction} from '@angular/cdk/bidi';
import {InjectionToken, ViewContainerRef} from '@angular/core';
import {TooltipPosition} from '../toolttip-position';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const POPOVER_DATA = new InjectionToken<any>('MyPopoverData');
export const POPOVER_TRIGGER = new InjectionToken<any>('MyPopoverTrigger');



export class PopoverOptions<D = any> {
  /** Data to be injected into the popover content. */
  data?: D | null = null;

  /** The radius in px of the beak. */
  beakRadius?: number = 16;

  /** Space in px between the trigger element and the popover. */
  gap?: number = 8

  /** Custom class(es) for the overlay panel. */
  panelClass?: string | string[] = 'my-popover-panel';

  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /** The ARIA role of the popover element. */
  role?: string = 'popover';

  /** Whether the popover has a background. */
  hasBackdrop?: boolean = false;

  /** Custom class(es) for the popover. */
  backdropClass?: string | string[] | undefined = '';

  /** Whether the user can use escape or clicking on the backdrop or outside to close the modal. */
  disableClose?: boolean = false;

  /** The Popover position relative to her target. */
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
  containerComponent?: ComponentType<PopoverContainer>;

  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;

  /** The width of the popover. */
  width?: string = '';

  /** The height of the popover. */
  height?: string = '';

  /** The minimum width of the popover. */
  minWidth?: string | number = '';

  /** The minimum height of the popover. */
  minHeight?: string | number = '';

  /** The maximum width of the popover. */
  maxWidth?: string | number = '80vw';

  /** The maximum height of the popover. */
  maxHeight?: string | number = '';


  closeOnNavigation?: boolean = true;

  /** The layout direction for the dialog content. */
  direction?: Direction;

}
