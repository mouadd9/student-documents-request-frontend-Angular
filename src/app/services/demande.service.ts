import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/demande';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { DemandeStatus } from '../models/enums/document-status';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private host: string = environment.backendHost;

  constructor(private http: HttpClient) { }

  public fetchDemandesAsync(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.host + "/demandes");
  }

  public saveDemandeAsync(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.host +"/demandes", demande);
  } // Effect will use this methods when we dispatch an action of type requestDemande
  
  public validateDemandeAsync(demande: Demande /*demandeId: number*/): Observable<Demande>{
    // for the purpose of demonstration we will change it here instead of doing it in the backend
    let updatedDemande = {...demande, status:DemandeStatus.Validated}
    return this.http.put<Demande>(this.host + "/demandes/"+ demande.id ,updatedDemande); 

    // Production
    // return this.http.put<Demande>(this.host + "/demandes/validate/" + demandeId,{}); 
  }

  public refuseDemandeAsync(demande: Demande /*demandeId: number*/): Observable<Demande>{
    let updatedDemande = {...demande, status:DemandeStatus.Refused}
    return this.http.put<Demande>(this.host + "/demandes/" + demande.id ,updatedDemande);

    // Production
    // return this.http.put<Demande>(this.host + "/demandes/refuse/" + demandeId,{});
  }


}






  // here we will send the following requests : 
  // - POST a demande (response : error , success) , saveDemandeAsync()
  // - GET all demandes ,fetchDemandesAsync()
  // - UPDATE : validate a demande (response : error , success) , validateDemandeAsync()
  // - UPDATE : refuse a demande (response : error , success) , refuseDemandeAsync()


// un rappel : 
  //------------comment creer des méthodes en Typescript ?
/* 
public nameOfMethod( argument: typeOfArgument ) : typeOfReturn {
  return data ; 
}
*/
  //----------- Observables
/*

1- 
Observables wrap around a "data stream" and emits data to subscribers
whenever new events are emitted into the stream.

2- 
   "http : HttpClient"
is a special object that creates Observables that wrap around a data source "API endpoint".

3- 
   "this.http.get<Demande[]>("endpoint URL");"
this returns an observable that when subscribed to implicitly sends an http request 
and listens to the stream of events emitted by the Restful Api and then reacts to it. 
 
*/