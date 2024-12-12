import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Statistics } from '../models/Statistics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private host: string = environment.devHost;
  private token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMzg2MjIwOCwiZXhwIjoxNzMzOTQ4NjA4fQ.hXyv53VPir6zEeGQMcdw5XOducQNK8oS3U8Jl3Py1sQ';  // Replace with your actual token

  constructor(private http: HttpClient) { }

  public fetchStats() : Observable<Statistics> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<Statistics>(this.host + "/admin/statistiques",{headers} )
  }

}
