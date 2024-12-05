import { Component, Input } from '@angular/core';
import { Demande } from '../../../../../models/demande';
import { DemandeService } from '../../../../../services/demande.service';

@Component({
  selector: 'app-demande-item',
  standalone: false,
  templateUrl: './demande-item.component.html',
  styleUrl: './demande-item.component.css'
})
export class DemandeItemComponent {
  @Input() demande: Demande| null=null;
  constructor(private demandeService: DemandeService) {}

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
  approveDemande(demande: any): void {
    // Update the status locally
    this.demandeService.validateDemandeAsync(demande).subscribe(
      (updatedDemande) => {
        demande.status = updatedDemande.status; // Update status locally after success
      },
      (error) => {
        console.error('Error approving demande:', error);
      }
    );
  }
  rejectDemande(demande: any): void {
    // Update the status locally
    this.demandeService.refuseDemandeAsync(demande).subscribe(
      (updatedDemande) => {
        demande.status = updatedDemande.status; // Update status locally after success
      },
      (error) => {
        console.error('Error rejecting demande:', error);
      }
    );
  }
}
