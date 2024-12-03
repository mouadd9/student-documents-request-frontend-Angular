import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from '../../../models/demande';
import { DocumentType } from '../../../models/enums/document-type';
import { Store } from '@ngrx/store';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';
// this is the state enum
import { STATE } from '../../../store/state';
// we import the state for the slice of state "demandes"
import { demandeState } from '../../../store/demandes-feature/demandes.state';
import { Observable } from 'rxjs';
import { selectDemandesState } from '../../../store/demandes-feature/demandes.selectors';


@Component({
  selector: 'app-demande',
  standalone: false,
  templateUrl: './demande.component.html',
  styleUrl: 'demande.component.css'
})
export class DemandeComponent implements OnInit{
  // making the state enum accessible to the template 
  public STATE = STATE;
  // property declarations
  private formBuilder : FormBuilder;
  private store : Store;
  public demandeForm!: FormGroup;
  private demande: Demande;
  public demandesState$! : Observable<demandeState>;

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
    this.store.dispatch(DemandeActions.resetDemandeStateEnum()); // here we turn the state to INITIAL to change the template 
    this.demandesState$ = this.store.select(selectDemandesState); // here we fetch the observable that emits the state changes
    this.demandeForm = this.formBuilder.group({ 
          email: ['', [Validators.required, Validators.email]],
          cin: ['', Validators.required],
          apogeeNumber: ['', Validators.required],
          documentType: ['', Validators.required]
    })
  }


  onSubmit(): void {
    if(this.demandeForm.valid) {
      this.demande = this.demandeForm.value;
      this.store.dispatch(DemandeActions.saveDemande({payload: this.demande}));
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

/*
How to work with [ngClass] directive 
- ngClass switches css classes based on typeScript viariables

Example : 
public active : boolean = true;

<div [ngClass]="{ 'class1': active, 'class2': !active }" ></div>


*/