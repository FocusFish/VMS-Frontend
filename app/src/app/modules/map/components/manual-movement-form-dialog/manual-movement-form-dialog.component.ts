import { Component, Inject } from '@angular/core';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'map-manual-movement-form-dialog',
  templateUrl: './manual-movement-form-dialog.component.html'
})
export class ManualMovementFormDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { location: string, timestamp: string, userTimezone: string }) {}
}
