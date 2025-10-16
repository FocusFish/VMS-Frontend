import { createAction, props } from "@ngrx/store";
import {
  CatalogItem,
  Catalogs,
  GlobalItem,
  Pings,
  Reporting,
} from "./admin.types";

export const updateSetting = createAction(
  "[Admin] Update global",
  props<{ setting: GlobalItem | CatalogItem }>()
);

export const loadCatalogs = createAction("[Admin] Load catalogs");

export const setCatalogs = createAction(
  "[Admin] Set catalogs",
  props<{ catalogs: Catalogs }>()
);

export const loadGlobals = createAction("[Admin] Load globals");

export const setGlobals = createAction(
  "[Admin] Set globals",
  props<{ globals: GlobalItem[] }>()
);

export const loadPings = createAction("[Admin] Load pings");

export const setPings = createAction(
  "[Admin] Set pings",
  props<{ pings: Pings }>()
);

export const loadReporting = createAction("[Admin] Load report config");

export const setReporting = createAction(
  "[Admin] Set report config",
  props<{ reporting: Reporting }>()
);
