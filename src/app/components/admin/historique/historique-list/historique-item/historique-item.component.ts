import { Component, Input } from '@angular/core';
import { Demande } from '../../../../../models/demande';
import { DemandeStatus } from '../../../../../models/enums/document-status';

@Component({
  selector: '[app-historique-item]',
  standalone: false,
  templateUrl: './historique-item.component.html',
  styleUrl: './historique-item.component.css'
})
export class HistoriqueItemComponent {
  @Input() demande!: Demande;
  public DemandeStatus = DemandeStatus;
}
