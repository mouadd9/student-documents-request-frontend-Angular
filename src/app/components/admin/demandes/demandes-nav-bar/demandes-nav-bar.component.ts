import { Component, EventEmitter, Output } from '@angular/core';
import { TypeDocument } from '../../../../models/enums/document-type';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-demandes-nav-bar',
  standalone: false,
  templateUrl: './demandes-nav-bar.component.html',
  styleUrl: './demandes-nav-bar.component.css'
})

// this component will help us filter our demands

export class DemandesNavBarComponent {
  
  @Output() categoryChanged = new EventEmitter<TypeDocument | null>();
  @Output() searchChanged = new EventEmitter<string>();

  onCategoryChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    let selectedCategory: TypeDocument | null = null;

    switch (selectedValue) {
      case TypeDocument.ATTESTATION_SCOLARITE:
        selectedCategory = TypeDocument.ATTESTATION_SCOLARITE;
        break;
      case TypeDocument.RELEVE_NOTES:
        selectedCategory = TypeDocument.RELEVE_NOTES;
        break;
      default:
        selectedCategory = null; // Represents "ALL" categories
        break;
    }

    this.categoryChanged.emit(selectedCategory);
    }

    onSearch(event: Event): void {
      const value = (event.target as HTMLInputElement).value;
      // console.log(value);
      this.searchChanged.emit(value);
    }
  }

