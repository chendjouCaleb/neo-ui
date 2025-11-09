import {InjectionToken} from '@angular/core';

export type TextFieldAppearance = 'fill' | 'outlined';


export interface TextFieldDefaultOptions {
  appearance: string;
}

export const TEXT_FIELD_DEFAULT_OPTIONS =
  new InjectionToken<TextFieldDefaultOptions>('my-text-field-default-options', {
    providedIn: 'root',
    factory: MY_TEXT_FIELD_DEFAULT_OPTIONS_FACTORY
  });

export function MY_TEXT_FIELD_DEFAULT_OPTIONS_FACTORY(): TextFieldDefaultOptions {
  return {
    appearance: 'fill'
  };
}
