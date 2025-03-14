import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {ComponentType} from '@angular/cdk/overlay';
import {PopoverContainer} from './popover-container';
import {Direction} from '@angular/cdk/bidi';

export type PopoverPosition = 'bottom' | 'top' | 'start' | 'end';

export class PopoverOptions<D = any> {
  /** Data to be injected into the popover content. */
  data?: D | null = null;

  /** Custom class(es) for the overlay panel. */
  panelClass?: string | string[] = 'my-popover-panel';

  /** Whether the popover has a background. */
  hasBackdrop?: boolean = false;

  /** Custom class(es) for the popover. */
  backdropClass?: string | string[]  | undefined = '';

  /** The Popover position relative to her target. */
  position?: PopoverPosition = 'bottom';

  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null = null;

  /** Aria label to assign to the dialog element */
  ariaLabel?: string | null = null;

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

  /** The size in pixel of the popover beak. */
  beakWidth?: number = 10;

  closeOnNavigation?: boolean = true;

  /** The layout direction for the dialog content. */
  direction?: Direction;

}
