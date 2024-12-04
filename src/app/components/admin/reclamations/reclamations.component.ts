import { Component, Input } from '@angular/core';
import { Reclamation } from '../../../models/reclamation';
import { ReclamationService } from '../../../services/reclamation.service';
import { ReclamationsNavBarComponent } from './reclamations-nav-bar/reclamations-nav-bar.component';
import { ReclamationsListComponent } from './reclamations-list/reclamations-list.component';

@Component({
  selector: 'app-reclamations',

  templateUrl: './reclamations.component.html',
  styleUrl: './reclamations.component.css'
})
export class ReclamationsComponent {
  @Input() reclamations: Reclamation[] = [];

  // demands: Demande[] = [];
  filteredReclamations: Reclamation[] = [];
  searchTerm: string = '';
  // selectedCategory: string = 'Toutes les demandes';

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.fetchReclamations();
  }

  fetchReclamations(): void {
    this.reclamationService.fetchAllReclamations().subscribe((data: Reclamation[]) => {
      this.reclamations = data;
      this.filteredReclamations = data; // Initially show all demandes
    });
  }


  onSearchChanged(searchTerm: string): void {
    this.searchTerm = searchTerm.toLowerCase();
    this.applyFilters();
  }

  // onCategoryChanged(category: string): void {
  //   this.selectedCategory = category;
  //   this.applyFilters();
  // }

  applyFilters(): void {
    this.filteredReclamations = this.reclamations.filter(r => {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      // const selectedCategoryLower = this.selectedCategory.toLowerCase().trim();
  
      const matchesSearch = 
        r.email.toLowerCase().includes(searchTermLower) ||
        r.cin.toLowerCase().includes(searchTermLower) ||
        r.apogeeNumber.toLowerCase().includes(searchTermLower);
  
      
      return matchesSearch;
    });
  }
}
