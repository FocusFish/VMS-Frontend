import {
  Component,
  Input,
  OnChanges,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { State } from "@app/app-reducer";
import { AdminActions } from "@data/admin";
import { CatalogItem } from "@data/admin/admin.types";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-catalog-item-list",
  templateUrl: "./catalog-item-list.component.html",
  styleUrl: "./catalog-item-list.component.scss",
  standalone: false,
})
export class CatalogItemListComponent implements OnChanges {
  @Input("catalogItems") catalogItems: CatalogItem[];
  @ViewChild("editingContainer") editingContainer: TemplateRef<any>;
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public displayColumns = ["key", "value", "description", "edit"];
  public dataSource: MatTableDataSource<CatalogItem> = new MatTableDataSource();

  public editForm = new FormGroup({
    value: new FormControl(""),
    description: new FormControl(""),
  });

  constructor(private store: Store<State>, private dialog: MatDialog) {}

  ngOnChanges(): void {
    this.dataSource.data = [...this.catalogItems];
  }

  openEdit(asset: CatalogItem) {
    const dialogRef = this.dialog.open(this.editingContainer, {
      data: { ...asset },
      minWidth: "460px",
    });

    this.editForm.get("value").setValue(asset.value);
    this.editForm.get("description").setValue(asset.description);

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.editForm.reset();
      });
  }

  updateAsset(asset: CatalogItem) {
    const setting = { ...asset };

    setting.value = this.editForm.get("value").value;
    setting.description = this.editForm.get("description").value;

    this.store.dispatch(AdminActions.updateSetting({ setting }));

    this.dialog.closeAll();
  }

  toggleBooleanAsset(asset: CatalogItem) {
    const setting = { ...asset };

    if (setting.value.toLowerCase() === "false") {
      setting.value = "true";
    } else {
      setting.value = "false";
    }

    this.store.dispatch(AdminActions.updateSetting({ setting }));
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
