import {ConnectedPosition} from '@angular/cdk/overlay';

export type TooltipPosition =
  'top-start' | 'top-center' | 'top-end' |
  'start-top' | 'start-center' | 'start-bottom' |
  'end-top' | 'end-center' | 'end-bottom' |
  'bottom-start' | 'bottom-center' | 'bottom-end';


const TOOLTIP_FALLBACK_POSITIONS: { [key: string]: TooltipPosition } = {
  'top-start': 'bottom-start',
  'top-center': 'bottom-center',
  'top-end': 'bottom-end',

  'bottom-start': 'top-start',
  'bottom-center': 'top-center',
  'bottom-end': 'top-end',

  'start-top': 'end-top',
  'start-center': 'end-center',
  'start-bottom': 'end-bottom',

  'end-top': 'start-top',
  'end-center': 'start-center',
  'end-bottom': 'start-bottom',
}
export const TOOLTIP_POSITIONS1: { [key: string]: ConnectedPosition } = {
  'top-start': {
    originX: 'start',
    overlayX: 'start',
    originY: 'top',
    overlayY: 'bottom',
    panelClass: 'my-popover_top-start'
  },
  'top-center': {
    originX: 'center',
    overlayX: 'center',
    originY: 'top',
    overlayY: 'bottom',
    panelClass: 'my-popover_top-center'
  },

  'top-end': {
    originX: 'end',
    overlayX: 'end',
    originY: 'top',
    overlayY: 'bottom',
    panelClass: 'my-popover_top-end'
  },


  'bottom-start': {
    originX: 'start',
    overlayX: 'start',
    originY: 'bottom',
    overlayY: 'top',
    panelClass: 'my-popover_bottom-start'
  },
  'bottom-center': {
    originX: 'center',
    overlayX: 'center',
    originY: 'bottom',
    overlayY: 'top',
    panelClass: 'my-popover_bottom-center'
  },
  'bottom-end': {
    originX: 'end',
    overlayX: 'end',
    originY: 'bottom',
    overlayY: 'top',
    panelClass: 'my-popover_bottom-end'
  },

  'start-top': {
    originX: 'start',
    overlayX: 'end',
    originY: 'top',
    overlayY: 'top',
    panelClass: 'my-popover_start-top'
  },
  'start-center': {
    originX: 'start',
    overlayX: 'end',
    originY: 'center',
    overlayY: 'center',
    panelClass: 'my-popover_start-center'
  },

  'start-bottom': {
    originX: 'start',
    overlayX: 'end',
    originY: 'bottom',
    overlayY: 'bottom',
    panelClass: 'my-popover_start-bottom'
  },
  'end-top': {
    originX: 'end',
    overlayX: 'start',
    originY: 'top',
    overlayY: 'top',
    panelClass: 'my-popover_end-top'
  },

  'end-center': {
    originX: 'end',
    overlayX: 'start',
    originY: 'center',
    overlayY: 'center',
    panelClass: 'my-popover_end-center'
  },

  'end-bottom': {
    originX: 'end',
    overlayX: 'start',
    originY: 'bottom',
    overlayY: 'bottom',
    panelClass: 'my-popover_end-bottom'
  },
};

export function getTooltipConnectedPositions(position: TooltipPosition, offset: number): ConnectedPosition[] {
  const fallbackPosition = TOOLTIP_FALLBACK_POSITIONS[position]
  let connectedPosition = { ...TOOLTIP_POSITIONS1[position] }
  let connectedPositionFallback = {...TOOLTIP_POSITIONS1[fallbackPosition]};

  connectedPosition = setPositionOffset(position, connectedPosition, offset);
  connectedPositionFallback = setPositionOffset(fallbackPosition, connectedPositionFallback, offset);
  return [connectedPosition, connectedPositionFallback];
}

function setPositionOffset(key: TooltipPosition, connectedPosition: ConnectedPosition, offset: number): ConnectedPosition {

  if (key.startsWith('top-')) {
    return {...connectedPosition, offsetY : -offset}
  } else if (key.startsWith('bottom-')) {
    return {...connectedPosition, offsetY : offset }
  } else if (key.startsWith('start-')) {
      return {...connectedPosition, offsetX : -offset }
  } else if (key.startsWith('end-')) {
        return {...connectedPosition, offsetX : offset }
  }
  throw new Error('Bad position')
}
