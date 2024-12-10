import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Statistics } from '../models/Statistics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private host: string = environment.prodHost;

  constructor(private http: HttpClient) { }

  public fetchStats() : Observable<Statistics> {
    return this.http.get<Statistics>(this.host + "/admin/statistiques" )
  }

}
