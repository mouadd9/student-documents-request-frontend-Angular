import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reclamationState } from '../../../store/reclamations-feature/reclamations.state';
import { selectReclamationState } from '../../../store/reclamations-feature/reclamations.selectors';
import { reclamationActions } from '../../../store/reclamations-feature/reclamations.actions';
import { STATE } from '../../../store/state';

@Component({
  selector: 'app-reclamation',
  standalone: false,
  templateUrl: './reclamation.component.html',
  styleUrl: 'reclamation.component.css',
})
export class ReclamationComponent implements OnInit {
  // we should inject the store
  // we need to build the form in ngOninit
  // we need to collect the observable<reclamationState> in ngOninit
  // when do we dispatch :
  // ---- on submit we will dispatch to the store a saveReclamation
  // when the component is loaded we will dispatch the resetReclamation so that the state is INITIAL and the button is ready to be used
  // when we click the state is LOADING the buttons cannot be used
  // when the effects return success , the state is LOADED , the button is in green
  // then the state is automatically set to INITIAL

  // dependencies
  private store: Store;
  private fb: FormBuilder;

  // our form
  public reclamationForm!: FormGroup;

  // an observable of type reclamataion state
  public reclamationState$!: Observable<reclamationState>;

  // making the state enum accessible to the template 
  public STATE = STATE;

  constructor(store: Store, fb: FormBuilder) {
    // this is called for the initialization
    this.store = store;
    this.fb = fb;
  }

  ngOnInit(): void {
    // first we dispatch an action to reset the reclamation
    this.store.dispatch(reclamationActions.resetReclamation()); // when we first load the component the State is set to INITIAL
    // here we will select the state
    this.reclamationState$ = this.store.select(selectReclamationState);
    // then we build our form
    this.reclamationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cin: ['', Validators.required],
      numApogee: ['', Validators.required],
      sujet: ['', Validators.required],
      message: ['', Validators.required]
    });
    // React to state changes to reset the form when state is LOADED
    this.reclamationState$.subscribe(state => {
      if (state.state === STATE.loaded) {
        this.reclamationForm.reset(); // Reset the form only when the state is LOADED
      }
    });
  }

  onSubmit(){
    if (this.reclamationForm.valid){
      this.store.dispatch(reclamationActions.saveReclamation({payload : this.reclamationForm.value}));
    } 
  }
}
