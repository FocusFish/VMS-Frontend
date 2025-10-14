import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getDefaultHttpOptions } from "@app/helpers/api-request";
import { environment } from "@src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  loadCatalogs(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/catalog",
      getDefaultHttpOptions(authToken)
    );
  }

  loadGlobals(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/globals",
      getDefaultHttpOptions(authToken)
    );
  }

  loadPings(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/pings",
      getDefaultHttpOptions(authToken)
    );
  }
}
