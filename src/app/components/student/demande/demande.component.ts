import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from '../../../models/demande';
import { DocumentType } from '../../../models/enums/document-type';
import { Store } from '@ngrx/store';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';

@Component({
  selector: 'app-demande',
  standalone: false,
  templateUrl: './demande.component.html',
  styleUrl: '../../../../assets/styles/student-demande-reclamation-form.css'
})
export class DemandeComponent implements OnInit{

  // property declarations
  private formBuilder : FormBuilder;
  private store : Store;
  public demandeForm!: FormGroup;
  private demande: Demande;

  public constructor(
    formBuilder : FormBuilder,
    store : Store
   ){ 
    // dependency injection
    this.formBuilder = formBuilder; 
    this.store = store;
    this.demande = {
      email : '',
      cin : '',
      apogeeNumber : '',
      documentType : DocumentType.Attestation
    }
  }

  // after the creation of the component
  ngOnInit(): void { 
    this.demandeForm = this.formBuilder.group({ 
          email: ['', [Validators.required, Validators.email]],
          cin: ['', Validators.required],
          apogeeNumber: ['', Validators.required],
          documentType: ['', Validators.required]
    })
  }

  // when the user clicks on submit
  onSubmit(): void {
    console.log("valid or not : " + this.demandeForm.valid); 
    if(this.demandeForm.valid) {
      this.demande = this.demandeForm.value;
      console.log("demande collected: ");
      console.log(this.demandeForm.value);
      // Note : 
      // the here we dispatch an action, the action is received by the reducer, the reducer passes the latest Demande state
      // then returns a new state : {demandes : [same as the latest], demandeState: LOADING, errorMessage: ""}
      // concurrently the action is processed by the effect, it returns dispatched either an action of type saveDemandeSuccess or saveDemandeError 
      this.store.dispatch(DemandeActions.saveDemande({payload: this.demande})); // we dispatch an action to the store
    }
  }




  // Note in other cases we need to fetch some kind of data before initializing the form 
  // so in this case we need to dispatch an action of type new demande that will fetch data for us and change the store's state to new
  // and us we should react to the store's state when its new then we use the data in the state to initialize the form





}



/*
User Interaction: The user fills in the form and submits it.
Dispatching an Action: This component dispatches an action to the store with the form data.
Reducer and Effects: The store forwards the action to the reducer and effects.
Service Interaction: The effect calls a service to perform an asynchronous operation (e.g., HTTP request).
Updating the State: The effect dispatches success or error actions based on the service response, and the reducer updates the state.
UI Updates: Components subscribed to the store react to state changes and update the UI accordingly.
*/

