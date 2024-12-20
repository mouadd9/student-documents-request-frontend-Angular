import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private host: string = environment.prodHost;

  constructor(private http: HttpClient) { }


 // here we will send the following requests : 
  // - POST a reclamation (response : error , success) , saveReclamationAsync()
  // - GET all demandes ,fetchReclamationsAsync()
  // - UPDATE a reclamation by adding a response
  
  public fetchAllReclamations() : Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.host + "/admin/reclamations" ).pipe(
      map((reclamations) => reclamations.slice().reverse())
    );
  }

  public saveReclamationAsync(reclamation: Reclamation): Observable<Reclamation> {
    return  this.http.post<Reclamation>(this.host + "/public/reclamations", reclamation);
  
  } // effects will use this Async Method when an action of type sendReclamation is dispatched 

  public updateReclamationAsync(updatedReclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(this.host + "/admin/reclamations/" + updatedReclamation.id + '/treat', updatedReclamation);
    // return this.http.put<Reclamation>(this.host + "/reclamations/" + reclamation.id, response);
  }

}
