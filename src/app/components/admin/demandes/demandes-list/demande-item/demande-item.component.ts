import { Component, Input } from '@angular/core';
import { Demande } from '../../../../../models/demande';
import { Store } from '@ngrx/store';
import { DemandeActions } from '../../../../../store/demandes-feature/demandes.actions';

@Component({
  selector: '[app-demande-item]',
  standalone: false,
  templateUrl: './demande-item.component.html',
  styleUrl: './demande-item.component.css'
})
export class DemandeItemComponent {
  @Input() demande!: Demande;
  constructor(private store:Store){}
  // we will dispatch actions from here to approve and reject
  onApprove(demande: Demande): void { 
    this.store.dispatch(DemandeActions.validateDemande({payload:demande}))
  }
  onReject(demande: Demande): void {
    this.store.dispatch(DemandeActions.refuseDemande({payload:demande}))
  }
}
