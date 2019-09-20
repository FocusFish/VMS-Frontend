import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { AssetReducer, AssetInterfaces } from './data/asset/';
import { AuthReducer, AuthInterfaces, AuthActions } from './data/auth/';
import { MapSettingsReducer, MapSettingsInterfaces } from './data/map-settings/';
import { MapLayersReducer, MapLayersInterfaces } from './data/map-layers/';
import { MapSavedFiltersReducer, MapSavedFiltersInterfaces } from './data/map-saved-filters/';
import { NotificationsReducer, NotificationsInterfaces } from './data/notifications/';
import { MergedRouteReducerState } from './data/router/router.interfaces';
import { MobileTerminalReducer, MobileTerminalInterfaces } from './data/mobile-terminal/';


export interface State {
  asset: AssetInterfaces.State;
  auth: AuthInterfaces.State;
  mapLayers: MapLayersInterfaces.State;
  mapSettings: MapSettingsInterfaces.State;
  mapSavedFilters: MapSavedFiltersInterfaces.State;
  mobileTerminal: MobileTerminalInterfaces.State;
  notifications: NotificationsInterfaces.State;
  router: MergedRouteReducerState;
}

export const reducers: ActionReducerMap<State> = {
  asset: AssetReducer.assetReducer,
  auth: AuthReducer.authReducer,
  mapLayers: MapLayersReducer.mapLayersReducer,
  mapSettings: MapSettingsReducer.mapSettingsReducer,
  mapSavedFilters: MapSavedFiltersReducer.mapSavedFiltersReducer,
  mobileTerminal: MobileTerminalReducer.mobileTerminalReducer,
  notifications: NotificationsReducer.notificationsReducer,
  router: routerReducer,
};


export function saveJwtTokenToStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action: any) => {
    if(action.type === AuthActions.loginSuccess.type) {
      window.localStorage.authToken = action.payload.jwtToken.raw;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] =
  environment.production
    ? [saveJwtTokenToStorage]
    : [saveJwtTokenToStorage];
