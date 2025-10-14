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

export interface State {
  configuration: {
    catalogs: Catalogs;
    globals: GlobalItem[];
    pings: Pings;
  };
  states: {
    catalogsLoaded: boolean;
    globalsLoaded: boolean;
    pingsLoaded: boolean;
  };
}
