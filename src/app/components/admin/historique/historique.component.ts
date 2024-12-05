import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Demande } from '../../../models/demande';
import { STATE } from '../../../store/state';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';
import { Store } from '@ngrx/store';
import { TypeDocument } from '../../../models/enums/document-type';
import { selectDataState, selectErrorMessage, selectNonPendingDemandes, selectNonPendingDemandesByStatus, selectNonPendingDemandesByType, selectNonPendingDemandesByTypeAndStatus } from '../../../store/demandes-feature/demandes.selectors';
import { DemandeStatus } from '../../../models/enums/document-status';
import { HistoriqueNavBarComponent } from "./historique-nav-bar/historique-nav-bar.component";
import { HistoriqueListComponent } from "./historique-list/historique-list.component";

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [HistoriqueNavBarComponent, HistoriqueListComponent],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {

  public category!: TypeDocument | null;
  public status!: DemandeStatus | null;

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
    // if the status and category are selected , then we will use a combined selector 
     if (this.category && this.status) {
      this.demandes$ = this.store.select(selectNonPendingDemandesByTypeAndStatus(this.category, this.status));
     } else if (this.category) {
      this.demandes$ = this.store.select(selectNonPendingDemandesByType(this.category));
     } else if (this.status) {
      this.demandes$ = this.store.select(selectNonPendingDemandesByStatus(this.status))
     } else {
      this.demandes$ = this.store.select(selectNonPendingDemandes)
     }
    this.combined$ = combineLatest([this.demandes$, this.state$, this.errorMessage$]).pipe(
      map(([demandes, state, errorMessage]) => ({
        demandes,
        state,
        errorMessage,
      }))
    );
  }

  // this is the method that will react to the Changing Category Event 
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


}
