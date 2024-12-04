import { Component, Input } from '@angular/core';
import { DemandeService } from '../../../services/demande.service';
import { Demande } from '../../../models/demande';

@Component({
  selector: 'app-demandes',
  standalone: false,
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})
export class DemandesComponent {
  @Input() demands: any[] = [];

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
      const matchesSearch = 
        demande.email.toLowerCase().includes(this.searchTerm) ||
        demande.cin.toLowerCase().includes(this.searchTerm) ||
        demande.apogeeNumber.toLowerCase().includes(this.searchTerm);

      const matchesCategory = 
        this.selectedCategory === 'Toutes les demandes' || 
        demande.documentType === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }
}
