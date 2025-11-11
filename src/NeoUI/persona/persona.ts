import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';


@Component({
    templateUrl: 'persona.html',
    styleUrl: 'persona.scss',
    selector: 'MyPersona',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    host: {
        'class': 'my-persona'
    }
})
export class MyPersona {
  @Input()
  showStatus: boolean = false
}
