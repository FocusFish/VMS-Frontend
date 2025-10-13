import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getDefaultHttpOptions } from "@app/helpers/api-request";
import { environment } from "@src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  loadPings(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/pings",
      getDefaultHttpOptions(authToken)
    );
  }

  loadCatalogs(authToken: string) {
    return this.http.get(
      environment.baseApiUrl + "config/rest/catalog",
      getDefaultHttpOptions(authToken)
    );
  }
}
