import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Statistics } from '../models/Statistics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private host: string = environment.prodHost;
  // private token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlIjoiQURNSU4iLCJpYXQiOjE3MzQwMzc1ODEsImV4cCI6MTczNDEyMzk4MX0.oxT9N7nmykCWUZAH5KVYRnyPNnONi2zRN8bt_I2ipc4';  // Replace with your actual token

  constructor(private http: HttpClient) { }

  public fetchStats() : Observable<Statistics> {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<Statistics>(this.host + "/admin/statistiques" )
  }

}
