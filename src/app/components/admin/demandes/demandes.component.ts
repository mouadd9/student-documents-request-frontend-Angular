import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDataState, selectDemandesByType, selectErrorMessage, selectPendingDemandes } from '../../../store/demandes-feature/demandes.selectors';
import { Demande } from '../../../models/demande';
import { STATE } from '../../../store/state';
import { TypeDocument } from '../../../models/enums/document-type';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';

@Component({
  selector: 'app-demandes',
  standalone: false,
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})


// this component will get the demandeState Observale from the store
export class DemandesComponent {

  // this will store an Observable of the demandeState
  public demandeState$! : Observable<STATE>; 
  // this will store an Observable that has demandes 
  public demandes$!: Observable<Demande[]>;
  public errorMessage$!: Observable<string>;

   // Combining multiple observables
  public combined$! : Observable<{
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }> ;


  constructor(private store:Store) {}

  ngOnInit(): void {
    // first we fetch data and populate the store with our data
    this.store.dispatch(DemandeActions.fetchDemandes()); // this will toggle the state from INITIAL to LOADING and LOADED/ERROR
    // these will be passed as inputs
    this.demandeState$ = this.store.select(selectDataState);
    this.errorMessage$ = this.store.select(selectErrorMessage);
    this.demandes$ = this.store.select(selectPendingDemandes); // we will only show pending state
    this.combined$ = combineLatest([this.demandes$, this.demandeState$, this.errorMessage$]).pipe(
      map(([demandes, state, errorMessage]) => ({
        demandes,
        state,
        errorMessage,
      })));
  }


  // these will be used when events are sent from a child component

  // if we chose to only show demandes that have of a certain type
  // we will send an event from the nav-bar that will be contain "category: TypeDocument" 
  // then we will only show the demandes that are of that category from the state
  onCategoryChanged(category: TypeDocument): void {
    this.demandes$ = this.store.select(selectDemandesByType(category));
  }

  onSelectingAllDemandes(): void {
    this.demandes$ = this.store.select(selectPendingDemandes);
  }



  /*
  onSearchChanged(searchTerm: string): void {
  }
  */

}
