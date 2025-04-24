import {InjectionToken} from '@angular/core';

export type MyPersonaSize = '24' | '32' | '40' | '48' | '56' | '72' | '100' | '120' | '180'
export interface MyPersonaDefaultOptions {
  color: string;
}

export const MY_PERSONA_DEFAULT_OPTIONS =
  new InjectionToken<MyPersonaDefaultOptions>('my-persona-default-options', {
    providedIn: 'root',
    factory: MY_PERSONA_DEFAULT_OPTIONS_FACTORY
  });

export function MY_PERSONA_DEFAULT_OPTIONS_FACTORY(): MyPersonaDefaultOptions {
  return {
    color: 'primary'
  };
}
