import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

/**
 * Animations used by MyToast.
 * @docs-private
 */
export const myToastAnimations: {
  readonly toastContainer: AnimationTriggerMetadata;
} = {
  /** Animation that is applied on the dialog container by default. */
  toastContainer: trigger('toastContainer', [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues.
    state('void, exit', style({opacity: 0, transform: 'translate3d(0, 48px, 0)'})),
    state('enter', style({transform: 'none'})),
    transition('* => enter', animate('200ms cubic-bezier(0, 0, 0.2, 1)',
      style({transform: 'none', opacity: 1}))),
    transition('* => void, * => exit',
      animate('2000ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0}))),
  ])
};
