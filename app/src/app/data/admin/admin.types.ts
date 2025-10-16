export interface GlobalItem {
  description: string;
  global: boolean;
  id: number;
  key: string;
  value: any;
}

export interface CatalogItem extends GlobalItem {
  module: string;
}
export interface Catalogs {
  [key: string]: CatalogItem[];
}

export interface Pings {
  [key: string]: {
    lastPing: string;
    online: boolean;
  };
}

// TODO: Expand this definition
export interface Reporting {
  layerSettings: any;
  mapSettings: any;
  referenceDataSettings: any;
  styleSettings: any;
  systemSettings: {
    geoserverUrl?: string;
    bingApiKey?: string;
  };
  toolSettings: any;
  visibilitySettings: any;
}

export interface State {
  configuration: {
    catalogs: Catalogs;
    globals: GlobalItem[];
    pings: Pings;
    reporting: Reporting;
  };
  states: {
    catalogsLoaded: boolean;
    globalsLoaded: boolean;
    pingsLoaded: boolean;
    reportingLoaded: boolean;
  };
}
