import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Demande } from '../../../models/demande';
import { STATE } from '../../../store/state';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';
import { Store } from '@ngrx/store';
import { TypeDocument } from '../../../models/enums/document-type';
import { selectDataState, selectErrorMessage, selectNonPendingDemandes, selectNonPendingDemandesByStatus, selectNonPendingDemandesByType, selectNonPendingDemandesByTypeAndStatus, selectSortedNonPendingDemandes } from '../../../store/demandes-feature/demandes.selectors';
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
     if (this.category && this.status) {
      this.demandes$ = this.store.select(selectNonPendingDemandesByTypeAndStatus(this.category, this.status));
     } else if (this.category) {
      this.demandes$ = this.store.select(selectNonPendingDemandesByType(this.category));
     } else if (this.status) {
      this.demandes$ = this.store.select(selectNonPendingDemandesByStatus(this.status))
     } else {
      this.demandes$ = this.store.select(selectSortedNonPendingDemandes)
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
  onSearchChanged(searchTerm: String):void{
    // this.combined$=this.store.select(selectDemandeBySearchKeyState(searchTerm));
    // const searchTerm = (event.target as HTMLInputElement).value;
    this.combined$ = combineLatest([
      this.store.select(selectSortedNonPendingDemandes), // Observable<Demande[]>
      this.store.select(selectDataState), // Observable<STATE>
      this.store.select(selectErrorMessage), // Observable<string>
    ]).pipe(
      map(([demandes, state, errorMessage]) => ({
        demandes: demandes.filter(
          (demande) =>
            demande.numApogee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            demande.etudiant?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase()) ||
            demande.status?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        state,
        errorMessage,
      }))
    );
  }

}
