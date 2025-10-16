import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getDefaultHttpOptions } from "@app/helpers/api-request";
import { environment } from "@src/environments/environment";
import { CatalogItem, GlobalItem } from "./admin.types";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  /** Shared */
  updateSetting(authToken: string, config: GlobalItem | CatalogItem) {
    return this.http.put(
      environment.baseApiUrl + "config/rest/settings/" + config.id,
      config,
      getDefaultHttpOptions(authToken)
    );
  }
  /** End shared */

  /** Catalogs */
  loadCatalogs(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/catalog",
      getDefaultHttpOptions(authToken)
    );
  }

  /** Globals */
  loadGlobals(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/globals",
      getDefaultHttpOptions(authToken)
    );
  }
  /** End globals */

  loadPings(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/pings",
      getDefaultHttpOptions(authToken)
    );
  }

  loadReportingConfig(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "spatial/rest/config/admin",
      getDefaultHttpOptions(authToken, {
        roleName: "AdminAll",
        scopeName: "All Reports",
      })
    );
  }
}
