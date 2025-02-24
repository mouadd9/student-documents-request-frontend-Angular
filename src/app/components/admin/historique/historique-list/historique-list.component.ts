import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from '../../../../models/demande';
import { STATE } from '../../../../store/state';
import { DemandeStatus } from '../../../../models/enums/document-status';
import { Store } from '@ngrx/store';
import { reclamationActions } from '../../../../store/reclamations-feature/reclamations.actions';
import { DemandeActions } from '../../../../store/demandes-feature/demandes.actions';
import { DemandeService } from '../../../../services/demande.service';

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

  constructor(
    private store: Store,
    private demandeService: DemandeService
  ) {}

  downloadDemande(demande: Demande) {
    this.demandeService.downloadDemande(demande).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const filename = `${demande.typeDocument}_${demande.etudiant?.nom}.pdf`;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    );
  }

  onRetry() {
    this.store.dispatch(DemandeActions.fetchDemandes());
  }
}
