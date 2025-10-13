import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { State } from "@app/app-reducer";
import { AdminActions, AdminSelectors } from "@data/admin";
import { Pings } from "@data/admin/admin.types";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

type PingsListItem = {
  status: boolean;
  name: string;
  timestamp: string;
};

@Component({
  selector: "app-pings",
  templateUrl: "./pings.component.html",
  styleUrl: "./pings.component.scss",
  standalone: false,
})
export class PingsComponent implements OnInit, OnDestroy {
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public displayColumns = ["status", "name", "timestamp"];
  public dataSource: MatTableDataSource<Pings> = new MatTableDataSource();

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadPings());

    this.store
      .select(AdminSelectors.getPings)
      .pipe(takeUntil(this.unmount$))
      .subscribe((pings) => {
        const pingsRecord = pings as Pings;
        const pingsList = [];

        Object.keys(pingsRecord).forEach((key) => {
          pingsList.push({
            status: pingsRecord[key].online,
            name: key,
            timestamp: pingsRecord[key].lastPing,
          });
        });

        this.dataSource.data = pingsList;
      });
  }

  ngOnDestroy() {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
