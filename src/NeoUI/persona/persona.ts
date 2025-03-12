import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  templateUrl: 'persona.html',
  styleUrl: 'persona.scss',
  selector: 'MyPersona',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf
  ],
  host: {
    'class': 'my-persona'
  }
})
export class Persona {
  @Input()
  showStatus: boolean = false
}
