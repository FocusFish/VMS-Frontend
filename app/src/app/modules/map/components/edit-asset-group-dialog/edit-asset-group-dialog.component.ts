import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AssetTypes } from '@data/asset';
import { MapSavedFiltersTypes } from '@data/map-saved-filters';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'map-edit-asset-group-dialog',
  templateUrl: './edit-asset-group-dialog.component.html',
  styleUrls: ['./edit-asset-group-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditAssetGroupDialogComponent {

  public assetGroupFilterQuery: Readonly<MapSavedFiltersTypes.AssetFilterQuery>;
  public filterName: UntypedFormControl;
  public miniAssets: ReadonlyArray<{ assetName: string, assetId: string }>;
  public assetsToRemove: ReadonlyArray<string> = [];

  constructor(
    public dialogRef: MatDialogRef<EditAssetGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      assetGroupFilter: Readonly<MapSavedFiltersTypes.SavedFilter>
      assets: Readonly<{ readonly [assetId: string]: AssetTypes.Asset }>
    }
  ) {
    this.assetGroupFilterQuery = data.assetGroupFilter.filter.find(filterQuery => filterQuery.type === 'GUID');
    this.miniAssets = this.assetGroupFilterQuery.values.map(assetId => ({
      assetId,
      assetName: data.assets[assetId] ? data.assets[assetId].name : null
    }));
    this.filterName = new UntypedFormControl(data.assetGroupFilter.name, Validators.required);
  }

  getErrorMessage() {
    if (this.filterName.hasError('required')) {
      return 'You must enter a value';
    }
  }

  toggleRemoveAsset(assetId: string) {
    if(this.assetsToRemove.includes(assetId)) {
      this.assetsToRemove = this.assetsToRemove.filter(id => id !== assetId);
    } else {
      this.assetsToRemove = [ ...this.assetsToRemove, assetId];
    }
  }

  result() {
    const ids = this.assetGroupFilterQuery.values.filter(assetId => !this.assetsToRemove.includes(assetId));
    if(this.filterName.value !== this.data.assetGroupFilter.name || this.assetGroupFilterQuery.values.length !== ids.length) {
      return {
        ...this.data.assetGroupFilter,
        name: this.filterName.value,
        filter: this.data.assetGroupFilter.filter.map(filter => {
          if(filter.type === 'GUID') {
            return { ...filter, values: ids };
          }
          return filter;
        })
      };
    }
  }
}
