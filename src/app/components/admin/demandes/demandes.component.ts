import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDataState, selectDemandesByType, selectErrorMessage, selectPendingDemandes } from '../../../store/demandes-feature/demandes.selectors';
import { Demande } from '../../../models/demande';
import { STATE } from '../../../store/state';
import { TypeDocument } from '../../../models/enums/document-type';

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
  // we will use selectors to change its content
  public demandes$!: Observable<Demande[]>;
  public errorMessage$!: Observable<string>;

   // Combine multiple observables if necessary
  public combined$ = combineLatest([this.demandes$, this.demandeState$, this.errorMessage$]).pipe(
    map(([demandes, state, errorMessage]) => ({
      demandes,
      state,
      errorMessage,
    })));


  constructor(private store:Store) {}

  ngOnInit(): void {
    // these will passed as inputs
    this.demandeState$ = this.store.select(selectDataState);
    this.errorMessage$ = this.store.select(selectErrorMessage);
    this.demandes$ = this.store.select(selectPendingDemandes);
  }


  // these will used when events are sent from a child component
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
