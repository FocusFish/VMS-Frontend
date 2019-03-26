import { Action } from '@ngrx/store';
import { ActionTypes } from './map-settings.actions';

export interface Viewport {
  zoom: number;
  center: Array<number>;
}

export interface State {
  flagsVisible: boolean;
  tracksVisible: boolean;
  namesVisible: boolean;
  speedsVisible: boolean;
  viewports: { [key: number]: Viewport };
}

const initialState: State = {
  flagsVisible: true,
  tracksVisible: false,
  namesVisible: false,
  speedsVisible: false,
  viewports: {},
};

export function mapSettingsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.SetVisibilityForAssetNames:
      return { ...state, namesVisible: action.payload };
    case ActionTypes.SetVisibilityForAssetSpeeds:
      return { ...state, speedsVisible: action.payload };
    case ActionTypes.SetVisibilityForFlags:
      return { ...state, flagsVisible: action.payload };
    case ActionTypes.SetVisibilityForTracks:
      return { ...state, tracksVisible: action.payload };
    case ActionTypes.SaveViewport:
      return { ...state, viewports: {
        ...state.viewports,
        [action.payload.key]: action.payload.viewport
      }};
    default:
      return state;
  }
}
