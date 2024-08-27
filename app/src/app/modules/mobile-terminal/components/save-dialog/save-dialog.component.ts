import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AssetTypes } from '@data/asset';
import { MapSavedFiltersTypes } from '@data/map-saved-filters';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mobile-terminal-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaveDialogComponent {

  public note = new UntypedFormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<SaveDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    return this.note.value;
  }
}
