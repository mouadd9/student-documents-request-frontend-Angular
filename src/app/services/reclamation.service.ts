import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient) { }


 // here we will send the following requests : 
  // - POST a reclamation (response : error , success) , saveReclamationAsync()
  // - GET all demandes ,fetchReclamationsAsync()

  


}
