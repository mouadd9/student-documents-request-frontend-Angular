import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  // here we will send the following requests : 
  // - POST a demande (response : error , success)
  // - GET all demandes 
  // - UPDATE : validate a demande (response : error , success)
  // - UPDATE : refuse a demande (response : error , success)

}
