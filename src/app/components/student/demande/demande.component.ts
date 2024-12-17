import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';
// this is the state enum
import { STATE } from '../../../store/state';
// we import the state for the slice of state "demandes"
import { demandeState } from '../../../store/demandes-feature/demandes.state';
import { Observable } from 'rxjs';
import { selectDemandesState } from '../../../store/demandes-feature/demandes.selectors';
import { TypeDocument } from '../../../models/enums/document-type';


@Component({
  selector: 'app-demande',
  standalone: false,
  templateUrl: './demande.component.html',
  styleUrl: 'demande.component.css'
})
export class DemandeComponent implements OnInit{
  // making the state enum accessible to the template 
  public STATE = STATE;
  public typeDocumentOptions = [
    { value: TypeDocument.ATTESTATION_SCOLARITE, label: 'Attestation de Scolarité' },
    { value: TypeDocument.RELEVE_NOTES, label: 'Relevé de Notes' },
  ];
  // property declarations
  private formBuilder : FormBuilder;
  private store : Store;
  public demandeForm!: FormGroup;
  public demandesState$! : Observable<demandeState>;

  public constructor(
    formBuilder : FormBuilder,
    store : Store
   ){ 
    // dependency injection
    this.formBuilder = formBuilder; 
    this.store = store;
  }

  // after the creation of the component
  ngOnInit(): void { 
    this.store.dispatch(DemandeActions.resetDemandeStateEnum()); // here we turn the state to INITIAL to change the template 
    this.demandesState$ = this.store.select(selectDemandesState); // here we fetch the observable that emits the state changes
    this.demandeForm = this.formBuilder.group({ 
          email: ['', [Validators.required, Validators.email]],
          cin: ['', Validators.required],
          numApogee: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
          typeDocument: ['', Validators.required]
    })

    // React to state changes to reset the form when state is LOADED
    this.demandesState$.subscribe(state => {
      if (state.demandeState === STATE.loaded) {
        this.demandeForm.reset(); // Reset the form only when the state is LOADED
      }
    });
  }


  onSubmit(): void {
    if(this.demandeForm.valid) {
      this.store.dispatch(DemandeActions.saveDemande({payload: this.demandeForm.value}));
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