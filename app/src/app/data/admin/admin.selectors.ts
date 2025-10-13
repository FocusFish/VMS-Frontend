import { State } from "@app/app-reducer";
import { createSelector } from "@ngrx/store";
import { AdminTypes } from ".";

const selectAdmin = (state: State) => state.admin;

export const getPings = createSelector(
  selectAdmin,
  (state: AdminTypes.State) => state.configuration.pings
);

export const getCatalogs = createSelector(
  selectAdmin,
  (state: AdminTypes.State) => state.configuration.catalogs
);
