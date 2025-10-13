import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminActions } from ".";
import { map, mergeMap, withLatestFrom } from "rxjs/operators";
import { AdminService } from "./admin.service";
import { Store } from "@ngrx/store";
import { State } from "@app/app-reducer";
import { AuthSelectors } from "@data/auth";

@Injectable()
export class AdminEffects {
  constructor(
    private readonly actions$: Actions,
    private adminService: AdminService,
    private store: Store<State>
  ) {}

  loadPings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadPings),
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([_, authToken]: Array<any>) => {
        return this.adminService.loadPings(authToken).pipe(
          map((response: any) => {
            return AdminActions.setPings({ pings: response.body });
          })
        );
      })
    )
  );

  loadCatalogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadCatalogs),
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([_, authToken]: Array<any>) => {
        return this.adminService.loadCatalogs(authToken).pipe(
          map((response: any) => {
            return AdminActions.setCatalogs({ catalogs: response.body });
          })
        );
      })
    )
  );
}
