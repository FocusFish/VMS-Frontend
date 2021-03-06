import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@app/app-reducer';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { mergeMap, map, withLatestFrom, catchError, filter } from 'rxjs/operators';

import { AuthSelectors } from '../auth';

import { NotificationsActions } from '../notifications';
import { MapSavedFiltersActions, MapSavedFiltersSelectors } from './';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { MapSavedFiltersService } from './map-saved-filters.service';

import { replacePlaceholdersInTranslation } from '@app/helpers/helpers';
import { apiErrorHandler, apiUpdateTokenHandler } from '@app/helpers/api-response-handler';

@Injectable()
export class MapSavedFiltersEffects {

  private readonly apiErrorHandler: (response: any, index: number, withHeaders?: boolean) => boolean;
  private readonly apiUpdateTokenHandler: (response: any) => any;

  constructor(
    private readonly actions$: Actions,
    private readonly userSettingsService: UserSettingsService,
    private readonly mapSavedFiltersService: MapSavedFiltersService,
    private readonly store: Store<State>
  ) {
    this.apiErrorHandler = apiErrorHandler(this.store);
    this.apiUpdateTokenHandler = apiUpdateTokenHandler(this.store);
  }

  saveMapFiltersObserver$ = createEffect(() => this.actions$.pipe(
    ofType(MapSavedFiltersActions.saveFilter),
    mergeMap((outerAction) => of(outerAction).pipe(
      withLatestFrom(
        this.store.select(AuthSelectors.getAuthToken)
      ),
      mergeMap(([action, authToken]: Array<any>, index: number) => {
        let request: Observable<any>;
        if(typeof action.filter.id === 'undefined') {
          request = this.mapSavedFiltersService.create(authToken, action.filter);
        } else {
          request = this.mapSavedFiltersService.update(authToken, action.filter);
        }
        return request.pipe(
          filter((response: any, fIndex: number) => this.apiErrorHandler(response, fIndex)),
          map((response) => { this.apiUpdateTokenHandler(response); return response.body; }),
          map((response: any) => {
            const message = $localize`:@@ts-savedfilters-saved:Filter '[[[filterName]]]' saved!`;
            return [
              NotificationsActions.addSuccess(replacePlaceholdersInTranslation(message, { filterName: action.filter.name })),
              MapSavedFiltersActions.addSavedFilter({ filter: response })
            ];
          }),
          mergeMap(a => a),
          catchError((err) => of({ type: 'API ERROR', payload: err }))
        );
      })
    ))
  ));

  getFiltersObserver$ = createEffect(() => this.actions$.pipe(
    ofType(MapSavedFiltersActions.getAll),
    mergeMap((outerAction) => of(outerAction).pipe(
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([action, authToken]: Array<any>) => {
        return this.mapSavedFiltersService.list(authToken).pipe(
          filter((response: any, index: number) => this.apiErrorHandler(response, index)),
          map((response) => { this.apiUpdateTokenHandler(response); return response.body; }),
          map((response: any) => {
            return MapSavedFiltersActions.setSavedFitlers({ filters: response.savedFilters });
          })
        );
      })
    ))
  ));

  deleteFiltersObserver$ = createEffect(() => this.actions$.pipe(
    ofType(MapSavedFiltersActions.deleteFilter),
    mergeMap((outerAction) => of(outerAction).pipe(
      withLatestFrom(this.store.select(AuthSelectors.getAuthToken)),
      mergeMap(([action, authToken]: Array<any>) => {
        return this.mapSavedFiltersService.delete(authToken, action.filterId).pipe(
          filter((response: any, index: number) => this.apiErrorHandler(response, index)),
          map((response) => { this.apiUpdateTokenHandler(response); return response.body; }),
          map((response: any) => {
            return MapSavedFiltersActions.removeSavedFilter({ filterId: action.filterId });
          })
        );
      })
    ))
  ));

}
