import {InjectionToken} from '@angular/core';

export type TextFieldAppearance = 'fill' | 'outlined';


export interface MyTextFieldDefaultOptions {
  appearance: string;
}

export const MY_TEXT_FIELD_DEFAULT_OPTIONS =
  new InjectionToken<MyTextFieldDefaultOptions>('my-text-field-default-options', {
    providedIn: 'root',
    factory: MY_TEXT_FIELD_DEFAULT_OPTIONS_FACTORY
  });

export function MY_TEXT_FIELD_DEFAULT_OPTIONS_FACTORY(): MyTextFieldDefaultOptions {
  return {
    appearance: 'fill'
  };
}
