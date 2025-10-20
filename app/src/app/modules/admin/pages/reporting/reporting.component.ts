import { Component, OnDestroy, OnInit } from "@angular/core";
import { State } from "@app/app-reducer";
import { AdminActions, AdminSelectors } from "@data/admin";
import { Reporting } from "@data/admin/admin.types";
import { AuthSelectors } from "@data/auth";
import { Store } from "@ngrx/store";
import { combineLatest, Subject } from "rxjs";
import { distinctUntilChanged, filter, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-reporting",
  templateUrl: "./reporting.component.html",
  styleUrl: "./reporting.component.scss",
  standalone: false,
})
export class ReportingComponent implements OnInit, OnDestroy {
  private unmount$: Subject<boolean> = new Subject<boolean>();

  public reporting: Reporting;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(AuthSelectors.getUser),
      this.store.select(AdminSelectors.getStates),
    ])
      .pipe(
        takeUntil(this.unmount$),
        distinctUntilChanged(([user, _]) => !!user?.role?.name)
      )
      .subscribe(([user, states]) => {
        if (user?.role && !states.reportingLoaded) {
          this.store.dispatch(AdminActions.loadReporting());
        }
      });

    this.store
      .select(AdminSelectors.getReporting)
      .pipe(takeUntil(this.unmount$))
      .subscribe((reporting) => {
        this.reporting = reporting;

        console.log("REPO", this.reporting);
      });
  }

  ngOnDestroy(): void {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();
  }
}
