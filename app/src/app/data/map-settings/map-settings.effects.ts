import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@app/app-reducer';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, withLatestFrom, catchError, filter } from 'rxjs/operators';

import { AuthSelectors } from '../auth';
import { NotificationsActions } from '@data/notifications';

import { MapSettingsSelectors, MapSettingsActions } from './';
import { MapSettingsService } from '@data/map-settings/map-settings.service';
import { UserSettingsService } from '@data/user-settings/user-settings.service';

import { apiErrorHandler, apiUpdateTokenHandler } from '@app/helpers/api-response-handler';

@Injectable()
export class MapSettingsEffects {

  private readonly apiErrorHandler: (response: any, index: number, withHeaders?: boolean) => boolean;
  private readonly apiUpdateTokenHandler: (response: any) => any;

  constructor(
    private readonly actions$: Actions,
    private readonly userSettingsService: UserSettingsService,
    private readonly mapSettingsService: MapSettingsService,
    private readonly store: Store<State>
  ) {
    this.apiErrorHandler = apiErrorHandler(this.store);
    this.apiUpdateTokenHandler = apiUpdateTokenHandler(this.store);
  }

  saveMapSettingsObserver$ = createEffect(() => this.actions$.pipe(
    ofType(MapSettingsActions.saveSettings),
    withLatestFrom(this.store.select(AuthSelectors.getUser)),
    mergeMap(([action, user]: Array<any>) => {
      return this.userSettingsService.saveMapSettings(user, action.settings).pipe(
        filter((response: any, index: number) => this.apiErrorHandler(response, index)),
        map((response) => { this.apiUpdateTokenHandler(response); return response.body; }),
        map((response: any, index: number) => [
          NotificationsActions.addSuccess($localize`:@@ts-map-settings-saved:Map settings saved`, 6000),
          MapSettingsActions.replaceSettings({ settings: action.settings })
        ]),
        mergeMap(a => a),
        catchError((err) => of({ type: 'API ERROR', payload: err }))
      );
    })
  ));

  saveMapLocationObserver$ = createEffect(() => this.actions$.pipe(
    ofType(MapSettingsActions.saveMapLocation),
    filter((action) => action.save),
    withLatestFrom(
      this.store.select(AuthSelectors.getUser),
      this.store.select(MapSettingsSelectors.getMapLocations)
    ),
    mergeMap(([action, user, mapLocations]: Array<any>) => {
      return this.userSettingsService.saveMapLocations(user, mapLocations).pipe(
        filter((response: any, index: number) => this.apiErrorHandler(response, index)),
        map((response) => { this.apiUpdateTokenHandler(response); return response.body; }),
        map((response: any, index: number) =>
          NotificationsActions.addSuccess($localize`:@@ts-map-location-saved:Map location saved`, 6000),
        ),
        catchError((err) => of({ type: 'API ERROR', payload: err }))
      );
    })
  ));

  deleteMapLocationObserver$ = createEffect(() => this.actions$.pipe(
    ofType(MapSettingsActions.deleteMapLocation),
    withLatestFrom(
      this.store.select(AuthSelectors.getUser),
      this.store.select(MapSettingsSelectors.getMapLocations)
    ),
    mergeMap(([action, user, mapLocations]: Array<any>) => {
      return this.userSettingsService.saveMapLocations(user, mapLocations).pipe(
        filter((response: any, index: number) => this.apiErrorHandler(response, index)),
        map((response) => { this.apiUpdateTokenHandler(response); return response.body; }),
        map((response: any, index: number) => [
          NotificationsActions.addSuccess($localize`:@@ts-map-location-saved:Map location removed`, 6000),
        ]),
        mergeMap(a => a),
        catchError((err) => of({ type: 'API ERROR', payload: err }))
      );
    })
  ));

  getMovementSourcesObserver$ = createEffect(() => this.actions$.pipe(
    ofType(MapSettingsActions.getMovementSources),
    withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.mapSettingsService.getMovementSources(authToken).pipe(
        filter((response: any, index: number) => this.apiErrorHandler(response, index)),
        map((response) => { this.apiUpdateTokenHandler(response); return response.body; }),
        map((sources: any, index: number) =>
          MapSettingsActions.setMovementSources({ movementSources: sources })
        ),
        catchError((err) => of({ type: 'API ERROR', payload: err }))
      );
    })
  ));

}
