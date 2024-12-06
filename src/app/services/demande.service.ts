import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/demande';
import { map, Observable, switchMap, timer } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { DemandeStatus } from '../models/enums/document-status';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private host: string = environment.backendHost;

  constructor(private http: HttpClient) { }

  // this is used by the Demande Component to fetch data to populate the store
  public fetchDemandesAsync(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.host + "/demandes").pipe(
      map(demandes => demandes.slice().reverse()) // Reverses the array
    );
  }

  // this is used by the student/demande component to post a new Demande
  public saveDemandeAsync(demande: Demande): Observable<Demande> {
    return timer(4000).pipe(
      switchMap(() => this.http.post<Demande>(this.host + "/demandes", demande))
    );
  } // Effect will use this methods when we dispatch an action of type requestDemande
  
  public validateDemandeAsync(demande: Demande): Observable<Demande>{
    // for the purpose of demonstration we will change it here instead of doing it in the backend
    const nowFormatted = formatCurrentDate();
    const updatedDemande = {
      ...demande,
      status: DemandeStatus.APPROVEE,
      dateTraitement: nowFormatted
    };
    
    return this.http.put<Demande>(
      `${this.host}/demandes/${demande.id}`,
      updatedDemande
    );
  }

  public refuseDemandeAsync(demande: Demande): Observable<Demande>{

    const nowFormatted = formatCurrentDate();
  const updatedDemande = {
    ...demande,
    status: DemandeStatus.REFUSEE,
    dateTraitement: nowFormatted
  };
    return this.http.put<Demande>(
      `${this.host}/demandes/${demande.id}`,
      updatedDemande
    );
  }


}


function formatCurrentDate(): string {
  const now = new Date();
  
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are zero-indexed
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
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