import { createAction, props } from '@ngrx/store';
import { MapLayer, CascadedLayer } from './map-layers.types';

export const addAreas = createAction(
  '[Map Layers] Add areas',
  props<{ mapLayers: Readonly<{ readonly [typeName: string]: MapLayer }> }>()
);

export const getAreas = createAction(
  '[Map Layers] Get areas'
);

export const getUserAreas = createAction(
  '[Map Layers] Get user areas'
);

export const setAreas = createAction(
  '[Map Layers] Set areas',
  props<{ mapLayers: Readonly<{ readonly [typeName: string]: MapLayer }> }>()
);

export const addActiveLayer = createAction(
  '[Map Layers] Add layer',
  props<{ layerName: string }>()
);

export const removeActiveLayer = createAction(
  '[Map Layers] Remove layer',
  props<{ layerName: string }>()
);

export const getCascadedLayers = createAction(
  '[Map Layers] Get cascaded Layers'
);

export const addCascadedLayers = createAction(
  '[Map Layers] Add cascaded Layers',
  props<{ cascadedLayers: Readonly<{ readonly [name: string]: CascadedLayer }> }>()
);
