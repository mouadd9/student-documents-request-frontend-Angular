import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-demande-item',
  standalone: false,
  templateUrl: './demande-item.component.html',
  styleUrl: './demande-item.component.css'
})
export class DemandeItemComponent {
  @Input() demande: any;

  // getStatusClass(status: string) {
  //   return status === 'En attente' ? 'status-pending' : status === 'Approuvé' ? 'status-approved' : 'status-rejected';
  // }

  // approveDemande(demande: any) {
  //   // Logic to approve the demand
  //   console.log('Approuver:', demande);
  // }

  // rejectDemande(demande: any) {
  //   // Logic to reject the demand
  //   console.log('Rejeter:', demande);
  // }
}
