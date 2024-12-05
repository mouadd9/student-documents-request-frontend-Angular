import { Component, Input } from '@angular/core';
import { Demande } from '../../../../../models/demande';

@Component({
  selector: '[app-demande-item]',
  standalone: false,
  templateUrl: './demande-item.component.html',
  styleUrl: './demande-item.component.css'
})
export class DemandeItemComponent {
  @Input() demande!: Demande;
  // we will dispatch actions from here , approve and reject
}
