import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminActions } from ".";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { AdminService } from "./admin.service";
import { Store } from "@ngrx/store";
import { State } from "@app/app-reducer";
import { AuthSelectors } from "@data/auth";
import {
  apiErrorHandler,
  apiUpdateTokenHandler,
} from "@app/helpers/api-response-handler";

@Injectable()
export class AdminEffects {
  private readonly apiErrorHandler: (
    response: any,
    index: number,
    withHeaders?: boolean
  ) => boolean;
  private readonly apiUpdateTokenHandler: (response: any) => any;

  constructor(
    private readonly actions$: Actions,
    private adminService: AdminService,
    private store: Store<State>
  ) {
    this.apiErrorHandler = apiErrorHandler(this.store);
    this.apiUpdateTokenHandler = apiUpdateTokenHandler(this.store);
  }

  loadCatalogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadCatalogs),
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([_, authToken]: Array<any>) => {
        return this.adminService.loadCatalogs(authToken).pipe(
          filter((response: any, index: number) =>
            this.apiErrorHandler(response, index)
          ),
          map((response) => {
            this.apiUpdateTokenHandler(response);
            return response.body;
          }),
          map((response: any) => {
            return AdminActions.setCatalogs({ catalogs: response });
          })
        );
      })
    )
  );

  loadGlobals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadGlobals),
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([_, authToken]: Array<any>) => {
        return this.adminService.loadGlobals(authToken).pipe(
          filter((response: any, index: number) =>
            this.apiErrorHandler(response, index)
          ),
          map((response) => {
            this.apiUpdateTokenHandler(response);
            return response.body;
          }),
          map((response: any) => {
            return AdminActions.setGlobals({ globals: response });
          })
        );
      })
    )
  );

  updateSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateSetting),
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([action, authToken]: Array<any>) => {
        return this.adminService.updateSetting(authToken, action.setting).pipe(
          filter((response: any, index: number) =>
            this.apiErrorHandler(response, index)
          ),
          map((response) => {
            this.apiUpdateTokenHandler(response);
            return response.body;
          }),
          map((_) => {
            if (action.setting.global) {
              return AdminActions.loadGlobals();
            } else {
              return AdminActions.loadCatalogs();
            }
          })
        );
      })
    )
  );

  loadPings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadPings),
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([_, authToken]: Array<any>) => {
        return this.adminService.loadPings(authToken).pipe(
          filter((response: any, index: number) =>
            this.apiErrorHandler(response, index)
          ),
          map((response) => {
            this.apiUpdateTokenHandler(response);
            return response.body;
          }),
          map((response: any) => {
            return AdminActions.setPings({ pings: response });
          })
        );
      })
    )
  );

  loadReporting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadReporting),
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([_, authToken]: Array<any>) => {
        return this.adminService.loadReportingConfig(authToken).pipe(
          filter((response: any, index: number) =>
            this.apiErrorHandler(response, index)
          ),
          map((response) => {
            this.apiUpdateTokenHandler(response);
            return response.body;
          }),
          map((response: any) => {
            return AdminActions.setReporting({ reporting: response });
          })
        );
      })
    )
  );
}
