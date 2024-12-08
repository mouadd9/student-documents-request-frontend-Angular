import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { STATE } from '../../../../store/state';
import { Demande } from '../../../../models/demande';
import { Store } from '@ngrx/store';
import { DemandeActions } from '../../../../store/demandes-feature/demandes.actions';

@Component({
  selector: 'app-demandes-list',
  standalone: false,
  templateUrl: './demandes-list.component.html',
  styleUrl: './demandes-list.component.css'
})


// this component will Subscribe to the combined$ Observable in its template
export class DemandesListComponent {
  
  // we use @Input to declare a property that will receive data from the parent component.
  // in our case demandeState$ (located in demandes-list) will receive an Observable<demandeState>; from (demandeComponent) 
  // this variable will be subscribed to in this template using <ng-container></ng-container>
  @Input() demandeState$!: Observable<{//shouldnt be used
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }> ;

  public STATE = STATE;

  constructor(private store:Store){}

  onApprove(demande: Demande): void { 
    this.store.dispatch(DemandeActions.validateDemande({payload:demande}))
  }
  onReject(demande: Demande): void {
    this.store.dispatch(DemandeActions.refuseDemande({payload:demande}))
  }
  onDownload(demande: Demande): void {
    // this.store.dispatch(DemandeActions.refuseDemande({payload:demande}))
    this.store.dispatch(DemandeActions.downloadDemand({payload:demande}));
  }

  onRetry(){
    this.store.dispatch(DemandeActions.fetchDemandes());
  }
}

/*
Un rappel : 
the @Input decorator is used to pass data from a parent component to a child component.
1 - We use @Input to declare a property that will receive data from the parent component.
2 - Bind to the child component's @Input property using property binding ([]) in the parent component's template.
*/
