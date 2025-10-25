import {InjectionToken} from '@angular/core';

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
export interface MyOptionParentComponent {
  multiple?: boolean;
  inertGroups?: boolean;
  hideSingleSelectionIndicator?: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const MY_OPTION_PARENT_COMPONENT = new InjectionToken<MyOptionParentComponent>(
  'MY_OPTION_PARENT_COMPONENT',
);
