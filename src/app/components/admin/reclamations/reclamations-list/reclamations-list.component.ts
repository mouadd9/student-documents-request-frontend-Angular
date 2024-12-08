import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { reclamationState } from '../../../../store/reclamations-feature/reclamations.state';
import { Reclamation } from '../../../../models/reclamation';

@Component({
  selector: 'app-reclamations-list',
  templateUrl: './reclamations-list.component.html',
  styleUrl: './reclamations-list.component.css',
})
export class ReclamationsListComponent {
  @Input() reclamationsState$!: Observable<reclamationState>; // this input property will be initialized with the passed observable
  expandedReclamation: Reclamation | null = null;
  toggleDetails(reclamation: Reclamation | null): void {
    this.expandedReclamation = this.expandedReclamation === reclamation ? null : reclamation;
  }
}
