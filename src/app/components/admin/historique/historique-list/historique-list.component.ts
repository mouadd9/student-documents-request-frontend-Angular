import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from '../../../../models/demande';
import { STATE } from '../../../../store/state';
import { DemandeStatus } from '../../../../models/enums/document-status';
import { Store } from '@ngrx/store';
import { reclamationActions } from '../../../../store/reclamations-feature/reclamations.actions';
import { DemandeActions } from '../../../../store/demandes-feature/demandes.actions';

@Component({
  selector: 'app-historique-list',
  standalone: false,
  templateUrl: './historique-list.component.html',
  styleUrl: './historique-list.component.css',
})
export class HistoriqueListComponent {
  @Input() demandeState$!: Observable<{
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }>;

  public DemandeStatus = DemandeStatus;
  public STATE = STATE;

  constructor(private store: Store) {}

  onRetry() {
    this.store.dispatch(DemandeActions.fetchDemandes());
  }
}
