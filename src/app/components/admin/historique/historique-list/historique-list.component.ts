import { Component } from '@angular/core';
import { HistoriqueItemComponent } from "./historique-item/historique-item.component";

@Component({
  selector: 'app-historique-list',
  standalone: true,
  imports: [HistoriqueItemComponent],
  templateUrl: './historique-list.component.html',
  styleUrl: './historique-list.component.css'
})
export class HistoriqueListComponent {

}
