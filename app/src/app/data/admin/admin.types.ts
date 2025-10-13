export interface CatalogItem {
  description: string;
  global: boolean;
  id: number;
  key: string;
  module: string;
  value: any;
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
    pings: Pings;
    catalogs: Catalogs;
  };
}
