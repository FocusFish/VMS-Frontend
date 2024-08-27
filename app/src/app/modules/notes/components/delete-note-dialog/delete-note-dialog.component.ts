import { Component, Inject } from '@angular/core';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'notes-delete-note-dialog',
  templateUrl: './delete-note-dialog.component.html'
})
export class DeleteNoteDialogDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { username: string, timestamp: string, userTimezone: string }) {}
}
