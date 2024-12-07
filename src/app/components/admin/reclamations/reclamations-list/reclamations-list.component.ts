import { Component, Input } from '@angular/core';
import { ReclamationService } from '../../../../services/reclamation.service';
import { Reclamation } from '../../../../models/reclamation';

@Component({
  selector: 'app-reclamations-list',
  templateUrl: './reclamations-list.component.html',
  styleUrl: './reclamations-list.component.css'
})
export class ReclamationsListComponent {
  @Input() reclamations: Reclamation[] = [];

  // demands: Demande[] = [];
  filteredReclamations: Reclamation[] = [];
  searchTerm: string = '';
  // selectedCategory: string = 'Toutes les demandes';

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
   // this.fetchReclamations();
  }




  onSearchChanged(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase();
    //this.applyFilters();
  }

  // onCategoryChanged(category: string): void {
  //   this.selectedCategory = category;
  //   this.applyFilters();
  // }

  /*applyFilters(): void {
    this.filteredReclamations = this.reclamations.filter(r => {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      // const selectedCategoryLower = this.selectedCategory.toLowerCase().trim();
  
      const matchesSearch = 
        r.email.toLowerCase().includes(searchTermLower) ||
        r.cin.toLowerCase().includes(searchTermLower) ||
        r.apogeeNumber.toLowerCase().includes(searchTermLower);
  
      
      return matchesSearch;
    });*/
  }
  // approveDemande(demande: any): void {
  //   // Update the status locally
  //   this.demandeService.validateDemandeAsync(demande).subscribe(
  //     (updatedDemande) => {
  //       demande.status = updatedDemande.status; // Update status locally after success
  //     },
  //     (error) => {
  //       console.error('Error approving demande:', error);
  //     }
  //   );
  // }
  // rejectDemande(demande: any): void {
  //   // Update the status locally
  //   this.demandeService.refuseDemandeAsync(demande).subscribe(
  //     (updatedDemande) => {
  //       demande.status = updatedDemande.status; // Update status locally after success
  //     },
  //     (error) => {
  //       console.error('Error rejecting demande:', error);
  //     }
  //   );
  // }
 

