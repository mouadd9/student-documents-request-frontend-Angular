import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {STATE} from '../../../../store/state';
import {Demande} from '../../../../models/demande';
import {Store} from '@ngrx/store';
import {DemandeActions} from '../../../../store/demandes-feature/demandes.actions';
import Swal from 'sweetalert2';  // for the popUps

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
  @Input() demandeState$!: Observable<{
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }>;

  public STATE = STATE;

  constructor(private store: Store) {
  }

  // before we used to have two buttons
  // each button emits a click event that triggers a function that dispatched an action

  // now we use sweetalert2 , when we click action button
  // a modal is shown with three buttons to either approve, deny or download

  onAction(demande: Demande): void {

    Swal.fire({
      title: 'Choisissez une action',

      html: `
        <button id="approveButton" class="swal2-confirm swal2-styled btn approve">Valider</button>
        <button id="rejectButton" class="swal2-deny swal2-styled btn reject">Refuser</button>
        <button id="downloadButton" class="swal2-cancel swal2-styled">Télécharger</button>
      `,

      showConfirmButton: false, // Pas de bouton par défaut
      didOpen: () => { // when the modal is shown we create three event listeners
        document.getElementById('approveButton')?.addEventListener('click', () => {
          Swal.close();
          this.onApprove(demande); // Appeler la fonction onApprove
        });
        document.getElementById('rejectButton')?.addEventListener('click', () => {
          Swal.close();
          this.onReject(demande); // Appeler la fonction onReject
        });
        document.getElementById('downloadButton')?.addEventListener('click', () => {
          Swal.close();
          this.onDownload(demande); // Appeler la fonction onDownload
        });
      },
    });
  }

  onApprove(demande: Demande): void {
    Swal.fire({
      title: 'Confirmer',
      text: 'Voulez-vous approuver cette demande?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, approuver',
      cancelButtonText: 'Annuler'
    }).then((result) => { // if we select approve
      if (result.isConfirmed) {
        this.store.dispatch(DemandeActions.validateDemande({payload: demande}))
      }
    });
  }

  onReject(demande: Demande): void {
    Swal.fire({
      title: 'Confirmer',
      text: 'Voulez-vous rejeter cette demande?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Oui, rejeter',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(DemandeActions.refuseDemande({payload: demande}))
      }
    });
  }

  onDownload(demande: Demande): void {
    Swal.fire({
      title: 'Confirmer',
      text: 'Voulez-vous télécharger cette demande?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Oui, télécharger',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(DemandeActions.downloadDemand({payload: demande}));
      }
    })
  }

  onRetry() {
    this.store.dispatch(DemandeActions.fetchDemandes());
  }

}


/*
Un rappel :
the @Input decorator is used to pass data from a parent component to a child component.
1 - We use @Input to declare a property that will receive data from the parent component.
2 - Bind to the child component's @Input property using property binding ([]) in the parent component's template.
*/
