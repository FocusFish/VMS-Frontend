import { Component, Input } from '@angular/core';
import { NotificationsTypes } from '@data/notifications';

@Component({
    selector: 'core-notifications',
    standalone: false
})

export class NotificationsComponent {
  @Input() notifications: NotificationsTypes.State;
  @Input() dismiss: (type: string, id: string) => void;
  @Input() overlay: boolean;
}
