import { Component, Input } from '@angular/core';
import { Demande } from '../../../../../models/demande';

@Component({
  selector: '[app-historique-item]',
  standalone: false,
  templateUrl: './historique-item.component.html',
  styleUrl: './historique-item.component.css'
})
export class HistoriqueItemComponent {
  @Input() demande!: Demande;
}
