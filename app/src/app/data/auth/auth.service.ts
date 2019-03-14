import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) {}

  login(username, password) {
    return this.http.post(
      environment.baseApiUrl + 'usm-administration/rest/authenticate',
      { userName: username, password: password}
    );
  }
}
