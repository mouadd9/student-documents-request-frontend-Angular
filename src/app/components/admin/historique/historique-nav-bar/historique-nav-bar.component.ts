import { Component, EventEmitter, Output } from '@angular/core';
import { TypeDocument } from '../../../../models/enums/document-type';
import { DemandeStatus } from '../../../../models/enums/document-status';

@Component({
  selector: 'app-historique-nav-bar',
  standalone: false,
  templateUrl: './historique-nav-bar.component.html',
  styleUrl: './historique-nav-bar.component.css'
})
export class HistoriqueNavBarComponent {
  @Output() categoryChanged = new EventEmitter<TypeDocument | null>();
  @Output() statusChanged = new EventEmitter<DemandeStatus | null>();
  @Output() searchedChanged = new EventEmitter<string>();

  onCategoryChange(event: Event){
    const selectedValue = (event.target as HTMLSelectElement).value;
    let selectedCategory: TypeDocument | null = null; // this will be emitted
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

  onStatusChange(event: Event){
    const selectedValue = (event.target as HTMLSelectElement).value;

    let selectedStatus: DemandeStatus | null = null;

    switch (selectedValue) {
      case DemandeStatus.APPROVEE:
        selectedStatus = DemandeStatus.APPROVEE;
        break;
      case DemandeStatus.REFUSEE:
        selectedStatus = DemandeStatus.REFUSEE;
        break;
      default:
        selectedStatus = null; // Represents "ALL" categories
        break;
    }

    this.statusChanged.emit(selectedStatus);

  }
  onSearch(event: Event):void{
    const value = (event.target as HTMLInputElement).value;
    this.searchedChanged.emit(value);
  }

}
