import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { Reclamation } from '../models/reclamation';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private host: string = environment.devHost;

  constructor(private http: HttpClient) { }


 // here we will send the following requests : 
  // - POST a reclamation (response : error , success) , saveReclamationAsync()
  // - GET all demandes ,fetchReclamationsAsync()
  // - UPDATE a reclamation by adding a response

  public saveReclamationAsync(reclamation: Reclamation): Observable<Reclamation> {
    return timer(4000).pipe(
      switchMap(() => this.http.post<Reclamation>(this.host + "/reclamations", reclamation))
    );
  
  } // effects will use this Async Method when an action of type sendReclamation is dispatched 
  public updateReclamationAsync(reclamation: Reclamation ,response: string ): Observable<Reclamation> {
    let updatedReclamation = {...reclamation, response: response};
    return this.http.put<Reclamation>(this.host + "/reclamations/" + reclamation.id, updatedReclamation);

    // return this.http.put<Reclamation>(this.host + "/reclamations/" + reclamation.id, response);
  }

  public fetchAllReclamations() : Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.host + "/reclamations" );

  }




}
