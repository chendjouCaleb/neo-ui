import {Directive} from '@angular/core';

@Directive({
  selector: '[MyPersonaText]',
  standalone: true,
  host: {
    class: 'my-persona-text'
  }
})
export class MyPersonaText { }


@Directive({
  selector: '[MyPersonaImage]',
  standalone: true,
  host: {
    class: 'my-persona-image'
  }
})
export class MyPersonaImage { }

@Directive({
  selector: '[MyPersonaIcon]',
  standalone: true,
  host: {
    class: 'my-persona-icon'
  }
})
export class MyPersonaIcon { }



@Directive({
  selector: '[MyPersonaStatus]',
  standalone: true,
  host: {
    class: 'my-persona-status'
  }
})
export class MyPersonaStatus { }
