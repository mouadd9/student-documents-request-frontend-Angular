import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/demande';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
 // the admin is the only authorized to fetchDemandes + validate/refuse a demande and download a pdf
 // when a request reaches the backend we check for the authorization header, we extract the token, and check if the api call is authorized
 // the Angular Interceptor, intercepts the http request and adds to it the jwt stored in state

  private host: string = environment.prodHost;

  constructor(private http: HttpClient) { }

// NOTE : 

 /*Manualy adding the authorization header (without interceptor) */
 // 1 - token :
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlIjoiQURNSU4iLCJpYXQiOjE3MzQwMzc1ODEsImV4cCI6MTczNDEyMzk4MX0.oxT9N7nmykCWUZAH5KVYRnyPNnONi2zRN8bt_I2ipc4';
 // 2 - manual header creation (Authorization Http Header)
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 // 3 - appending headers on creation of the request
    // return this.http.get<Demande[]>(`${this.host}/admin/demandes`, { headers });

 /* in Our case the interceptor does this for us */


  public fetchDemandesAsync(): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.host}/admin/demandes`).pipe(
      map(demandes => demandes.slice().reverse())  // Reverses the array
    );
  } // Effects will call this method when Demande Component is loaded 

  public saveDemandeAsync(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.host + "/public/demandes", demande);
  } // Effects will use this methods when we dispatch an action of type requestDemande, to save a demande from the student/demande component
  
  public validateDemandeAsync(demande: Demande): Observable<Demande>{
    // the backend will take in the demande and change its status from EN_ATTENTE to APPROVED
    return this.http.put<Demande>(`${this.host}/admin/demandes/${demande.id}/approve`,{});
  } // Effects will call this method when the admin dispatches an action of type validate Demande
  
  public refuseDemandeAsync(demande: Demande): Observable<Demande>{
    // the backend will take in the demande and change its status from EN_ATTENTE to DENIED
    return this.http.put<Demande>(`${this.host}/admin/demandes/${demande.id}/reject`,{});
  } // Effects will call this method when the admin dispatches an action of type refuse Demande

  public downloadDemande(demande: Demande): Observable<Blob> {
    return this.http.get(`${this.host}/admin/demandes/${demande.id}/pdf`, {
      responseType: 'blob'  // Response of type file, so we specify 'blob'
    });
  // this method will be used to retrieve a binary Blob file used to download a pdf from the backend
  // by default HttpClient expects a response of type json
  // in our case the response type is a binary file
  // we add responseType: 'blob', next to the Headers object
  } // Effects will call this method when the admin dispatched an action of type download Demande

}


    // json-server code

   /*  const nowFormatted = formatCurrentDate();
  const updatedDemande = {
    ...demande,
    status: DemandeStatus.REFUSEE,
    dateTraitement: nowFormatted
  };
    return this.http.put<Demande>(
      `${this.host}/demandes/${demande.id}`,
      updatedDemande
    );*/

   /* const nowFormatted = formatCurrentDate();
    const updatedDemande = {
      ...demande,
      status: DemandeStatus.APPROVEE,
      dateTraitement: nowFormatted
    };*/
   /* return this.http.put<Demande>(
      `${this.host}/demandes/${demande.id}`,
      updatedDemande
    );*/

          // return this.http.put<Demande>(
      //   `${this.host}/admin/demandes/${demande.id}/reject`, {});

/*
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
*/



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