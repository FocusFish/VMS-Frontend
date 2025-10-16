import { Component, OnDestroy, OnInit } from "@angular/core";
import { State } from "@app/app-reducer";
import { AdminActions, AdminSelectors } from "@data/admin";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-reporting",
  templateUrl: "./reporting.component.html",
  styleUrl: "./reporting.component.scss",
  standalone: false,
})
export class ReportingComponent implements OnInit, OnDestroy {
  private unmount$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadReporting());

    this.store
      .select(AdminSelectors.getReporting)
      .pipe(takeUntil(this.unmount$))
      .subscribe((reporting) => {});
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
