import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { State } from "@app/app-reducer";
import { AdminActions, AdminSelectors } from "@data/admin";
import { CatalogItem } from "@data/admin/admin.types";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-movement",
  templateUrl: "./movement.component.html",
  styleUrl: "./movement.component.scss",
  standalone: false,
})
export class MovementComponent {
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public displayColumns = ["key", "value", "description"];
  public movement: CatalogItem[];

  constructor(private store: Store<State>) {}

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
        const movement = catalogs["movement"];

        if (movement) {
          this.movement = [...movement];
        }
      });
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
