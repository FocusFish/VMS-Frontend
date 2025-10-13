import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { State } from "@app/app-reducer";
import { AdminActions, AdminSelectors } from "@data/admin";
import { CatalogItem } from "@data/admin/admin.types";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-exchange",
  templateUrl: "./exchange.component.html",
  styleUrl: "./exchange.component.sass",
  standalone: false,
})
export class ExchangeComponent implements OnInit, OnDestroy {
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public displayColumns = ["key", "value", "description"];
  public dataSource: MatTableDataSource<CatalogItem> = new MatTableDataSource();

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadCatalogs());

    this.store
      .select(AdminSelectors.getCatalogs)
      .pipe(takeUntil(this.unmount$))
      .subscribe((catalogs) => {
        this.dataSource.data = catalogs["exchange"];
      });
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
