import { createAction, props } from "@ngrx/store";
import { Catalogs, Pings } from "./admin.types";

export const loadPings = createAction("[Admin] Load pings");

export const setPings = createAction(
  "[Admin] Set pings",
  props<{ pings: Pings }>()
);

export const loadCatalogs = createAction("[Admin] Load catalogs");

export const setCatalogs = createAction(
  "[Admin] Set catalogs",
  props<{ catalogs: Catalogs }>()
);
