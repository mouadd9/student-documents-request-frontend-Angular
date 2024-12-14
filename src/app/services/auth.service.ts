import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host: string = environment.prodHost;

  constructor(private http: HttpClient) {}

  // this method will pass the credentials {username, password} and expects either a token or an error message
  // this token is decoded, and according to the claims we will determine what will happen next
  fetchTokenAsync(credentials: Credentials): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
   /* return this.http.post<any>(this.host + '/auth/login', credentials, {
      headers,
    });*/
    return this.http.post<any>(`${this.host}/auth/login`, credentials, {
      headers,
    });
  }
}


// so what will happen is when an authenticateAction is dispatched we will get credentials from its payload, and pass them to a service via effects
// this service will take in credentials and make an api call to get the token 
// now this endpoints gets the token , we will simulate a backend that takes in credentials and generates a token
// this token is in this form 'access-token' : ""
// next step is to dispatch an action of success, that will change the state 
// now the state has claims and has the jwt
// in the effects we will do the following :
// - get the value of access-token , from the response of the service mathod via map()
// - decode it, so we can extract the claims
// - return a dispatched action of type success containing the claims and the jwt 
// - this action will be used in the reducer to change the state