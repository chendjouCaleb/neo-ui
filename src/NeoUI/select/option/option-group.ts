import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {_IdGenerator} from '@angular/cdk/a11y';
import {MY_OPTION_PARENT_COMPONENT, MyOptionParentComponent} from './option-parent';

/**
 * Injection token that can be used to reference instances of `MyOptionGroup`.
 */
export const MY_OPTION_GROUP = new InjectionToken<MyOptionGroup>('MyOptionGroup');

@Component({
  selector: 'MyOptionGroup',
  exportAs: 'MyOptionGroup',
  templateUrl: 'option-group.html',
  styleUrl: 'option-group.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'my-option-group',
    '[attr.role]': '_inert ? null : "group"',
    '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
    '[attr.aria-labelledby]': '_inert ? null : _labelId',
  },
  providers: [{provide: MY_OPTION_GROUP, useExisting: MyOptionGroup}]
})
export class MyOptionGroup {
  /** Label for the option group. */
  @Input() label: string;

  /** whether the option group is disabled. */
  @Input({transform: booleanAttribute}) disabled: boolean = false;

  /** Unique id for the underlying label. */
  _labelId: string = inject(_IdGenerator).getId('my-group-label-');

  /** Whether the group is in inert a11y mode. */
  _inert: boolean;

  constructor(...args: unknown[]);

  constructor() {
    const parent = inject<MyOptionParentComponent>(MY_OPTION_PARENT_COMPONENT, {optional: true});
    this._inert = parent?.inertGroups ?? false;
  }
}
