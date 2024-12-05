import { Component } from '@angular/core';
import { HistoriqueNavBarComponent } from "./historique-nav-bar/historique-nav-bar.component";
import { HistoriqueListComponent } from "./historique-list/historique-list.component";

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [HistoriqueNavBarComponent, HistoriqueListComponent],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {

}
