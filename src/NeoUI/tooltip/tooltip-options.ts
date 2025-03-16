import {InjectionToken} from '@angular/core';
import {TooltipPosition} from '../toolttip-position';


export interface MyTooltipDefaultOptions {

  /** Default delay when the tooltip is hidden. */
  hideDelay: number

  /** Default delay when the tooltip is shown. */
  showDelay: number

  /** Default position for tooltips. */
  position: TooltipPosition

  /** Default classes to be applied to the tooltip.
   * These default classes will not be applied if tooltipClass is defined directly on the tooltip element,
   * as it will override the default.
   */
  tooltipClass: string | string[]
}

export const MY_TOOLTIP_DEFAULT_OPTIONS =
  new InjectionToken<MyTooltipDefaultOptions>('my-tooltip-default-options', {
    providedIn: 'root',
    factory: MY_TOOLTIP_DEFAULT_OPTIONS_FACTORY
  });

export function MY_TOOLTIP_DEFAULT_OPTIONS_FACTORY(): MyTooltipDefaultOptions {
  return {
    hideDelay: 100,
    showDelay: 100,
    position: 'bottom-center',
    tooltipClass: 'my-tooltip'
  };
}
