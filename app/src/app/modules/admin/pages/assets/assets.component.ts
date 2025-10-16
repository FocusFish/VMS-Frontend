import { Component, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { State } from "@app/app-reducer";
import { AdminActions, AdminSelectors } from "@data/admin";
import { CatalogItem } from "@data/admin/admin.types";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-assets",
  templateUrl: "./assets.component.html",
  styleUrl: "./assets.component.scss",
  standalone: false,
})
export class AssetsComponent {
  @ViewChild("editingContainer") editingContainer: TemplateRef<any>;
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public assets: CatalogItem[];

  public editForm = new FormGroup({
    value: new FormControl(""),
    description: new FormControl(""),
  });

  constructor(private store: Store<State>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store
      .select(AdminSelectors.getStates)
      .pipe(takeUntil(this.unmount$))
      .subscribe((states) => {
        if (!states.catalogsLoaded) {
          this.store.dispatch(AdminActions.loadCatalogs());
        }
      });

    this.store
      .select(AdminSelectors.getCatalogs)
      .pipe(takeUntil(this.unmount$))
      .subscribe((catalogs) => {
        const assets = catalogs["asset"] as CatalogItem[];

        if (assets) {
          this.assets = [...assets];
        }
      });
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
