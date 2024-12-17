import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Demande } from '../../../models/demande';
import { STATE } from '../../../store/state';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';
import { Store } from '@ngrx/store';
import { TypeDocument } from '../../../models/enums/document-type';
import { selectDataState, selectErrorMessage, selectNonPendingDemandes, selectNonPendingDemandesBySearchTerm, selectNonPendingDemandesByStatus, selectNonPendingDemandesByStatusAndSearchTerm, selectNonPendingDemandesByType, selectNonPendingDemandesByTypeAndSearchTerm, selectNonPendingDemandesByTypeAndStatus, selectNonPendingDemandesByTypeStatusAndSearchTerm, selectSortedNonPendingDemandes } from '../../../store/demandes-feature/demandes.selectors';
import { DemandeStatus } from '../../../models/enums/document-status';

@Component({
  selector: 'app-historique',
  standalone: false,
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {

  public category!: TypeDocument | null;
  public status!: DemandeStatus | null;
  public searchTerm!: string | null;

  public demandes$!: Observable<Demande[]>;
  public state$: Observable<STATE>;
  public errorMessage$: Observable<string>;

  public combined$!: Observable<{
    demandes : Demande[],
    state : STATE,
    errorMessage : string
  }>

  constructor(private store: Store){
    this.state$ = this.store.select(selectDataState);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  ngOnInit(): void {
    this.store.dispatch(DemandeActions.fetchDemandes());
    this.initializeCombinedObservable();
  }

  private initializeCombinedObservable(): void {

   // Determine which selector to use based on active filters
   if (this.category && this.status && this.searchTerm) {
    // All three filters are active
    this.demandes$ = this.store.select(
      selectNonPendingDemandesByTypeStatusAndSearchTerm(this.category, this.status, this.searchTerm)
    );
  } else if (this.category && this.status) {
    // Category and Status are active
    this.demandes$ = this.store.select(
      selectNonPendingDemandesByTypeAndStatus(this.category, this.status)
    );
  } else if (this.category && this.searchTerm) {
    // Category and Search Term are active
    this.demandes$ = this.store.select(
      selectNonPendingDemandesByTypeAndSearchTerm(this.category, this.searchTerm)
    );
  } else if (this.status && this.searchTerm) {
    // Status and Search Term are active
    this.demandes$ = this.store.select(
      selectNonPendingDemandesByStatusAndSearchTerm(this.status, this.searchTerm)
    );
  } else if (this.category) {
    // Only Category is active
    this.demandes$ = this.store.select(
      selectNonPendingDemandesByType(this.category)
    );
  } else if (this.status) {
    // Only Status is active
    this.demandes$ = this.store.select(
      selectNonPendingDemandesByStatus(this.status)
    );
  } else if (this.searchTerm) {
    // Only Search Term is active
    this.demandes$ = this.store.select(
      selectNonPendingDemandesBySearchTerm(this.searchTerm)
    );
  } else {
    // No filters are active, show all sorted non-pending demandes
    this.demandes$ = this.store.select(selectSortedNonPendingDemandes);
  }



    this.combined$ = combineLatest([this.demandes$, this.state$, this.errorMessage$]).pipe(
      map(([demandes, state, errorMessage]) => ({
        demandes,
        state,
        errorMessage,
      }))
    );
  }

  public onChangedCategory( category : TypeDocument | null ){
    this.store.dispatch(DemandeActions.fetchDemandes());
    this.category = category;
    this.initializeCombinedObservable();
  }

  public onChangedStatus( status : DemandeStatus | null) {
    this.store.dispatch(DemandeActions.fetchDemandes());
    this.status = status;
    this.initializeCombinedObservable();
  }
  public onSearchChanged(searchTerm: string):void{
    this.store.dispatch(DemandeActions.fetchDemandes());
    this.searchTerm = searchTerm;
    this.initializeCombinedObservable();
  }

}
