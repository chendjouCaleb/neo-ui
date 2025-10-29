import {Observable} from 'rxjs';

export abstract class TextFieldControl<T> {
  /** The value of the control. */
  value: T | null;

  /**
   * Stream that emits whenever the state of the control changes such that the parent `MyFormField`
   * needs to run change detection.
   */
  readonly stateChanges: Observable<void>

  /** The placeholder for this control. */
  readonly placeholder: string;

  /** Whether the control is focused. */
  readonly focused: boolean;

  /** Whether the control is empty. */
  readonly empty: boolean;

  controlName: string
  host: HTMLElement

  abstract hasValue(): boolean

  readonly disabled: boolean
  readonly errorState: boolean

  /**
   * An optional name for the control type that can be used to distinguish `mat-form-field` elements
   * based on their control type. The form field will add a class,
   * `mat-form-field-type-{{controlType}}` to its root element.
   */
  readonly controlType?: string;
}
