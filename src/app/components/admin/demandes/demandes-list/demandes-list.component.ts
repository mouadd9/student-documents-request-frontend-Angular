import { Component, Input } from '@angular/core';
import { Demande } from '../../../../models/demande';
import { DemandeService } from '../../../../services/demande.service';

@Component({
  selector: 'app-demandes-list',
  standalone: false,
  templateUrl: './demandes-list.component.html',
  styleUrl: './demandes-list.component.css'
})
export class DemandesListComponent {
  @Input() demands: Demande[] = [];

  // demands: Demande[] = [];
  filteredDemands: Demande[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'Toutes les demandes';

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes(): void {
    this.demandeService.fetchDemandesAsync().subscribe((data: Demande[]) => {
      this.demands = data;
      this.filteredDemands = data; // Initially show all demandes
    });
  }


  onSearchChanged(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase();
    this.applyFilters();
  }

  onCategoryChanged(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredDemands = this.demands.filter(demande => {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      const selectedCategoryLower = this.selectedCategory.toLowerCase().trim();
  
      const matchesSearch = 
        demande.email.toLowerCase().includes(searchTermLower) ||
        demande.cin.toLowerCase().includes(searchTermLower) ||
        demande.apogeeNumber.toLowerCase().includes(searchTermLower);
  
      const matchesCategory = 
        selectedCategoryLower === 'toutes les demandes' || 
        demande.documentType.toLowerCase().trim() === selectedCategoryLower;
      return matchesSearch && matchesCategory;
    });
  }
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
