import { Component, EventEmitter, Output } from '@angular/core';
import { TypeDocument } from '../../../../models/enums/document-type';

@Component({
  selector: 'app-demandes-nav-bar',
  standalone: false,
  templateUrl: './demandes-nav-bar.component.html',
  styleUrl: './demandes-nav-bar.component.css'
})

// this component will help us filter our demands

export class DemandesNavBarComponent {

  // we will send events from this component to the parent component
  // we will react to this event in parent component by changing the selected state to show 
  // WE ARE NOT DISPATCHING AN ACTION !!!!
  // the only dispatched action regarding fetching demandes is dispatched when the parent component is created
  // but we use selectors to only and ONLY select state that is stored in the store 
  
  // this is an event called categoryChanged that holds data of type string
  @Output() categoryChanged = new EventEmitter<TypeDocument | null>();

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
  }

