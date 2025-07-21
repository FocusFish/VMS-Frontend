import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-progress-circle',
    templateUrl: './progress-circle.component.html',
    styleUrls: ['./progress-circle.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class ProgressCircleComponent {
  @Input() progress: number;
  @Input() diameter: number;
  @Input() bright?: boolean;
}
