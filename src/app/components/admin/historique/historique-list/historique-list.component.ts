import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from '../../../../models/demande';
import { STATE } from '../../../../store/state';

@Component({
  selector: 'app-historique-list',
  standalone: false,
  templateUrl: './historique-list.component.html',
  styleUrl: './historique-list.component.css'
})
export class HistoriqueListComponent {
  @Input() demandeState$!: Observable<{
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }> ;
}
