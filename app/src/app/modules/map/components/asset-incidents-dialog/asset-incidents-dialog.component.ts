import { Component, Inject } from '@angular/core';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'map-asset-incidents-dialog',
  templateUrl: './asset-incidents-dialog.component.html',
  styleUrls: ['./asset-incidents-dialog.component.scss']
})
export class AssetIncidentsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { currentWorkflow: string, incidentType: string }) {}
}
