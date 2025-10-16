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
  selector: "app-movement-rules",
  templateUrl: "./movement-rules.component.html",
  styleUrl: "./movement-rules.component.scss",
  standalone: false,
})
export class MovementRulesComponent {
  @ViewChild("editingContainer") editingContainer: TemplateRef<any>;
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public displayColumns = ["key", "value", "description", "edit"];
  public movementRules: CatalogItem[];

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
        this.movementRules = catalogs["movementrules"];
      });
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
