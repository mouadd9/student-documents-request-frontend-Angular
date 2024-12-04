import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-demandes-nav-bar',
  standalone: false,
  templateUrl: './demandes-nav-bar.component.html',
  styleUrl: './demandes-nav-bar.component.css'
})

// this component will help us filter our demands

export class DemandesNavBarComponent {
  @Output() searchChanged = new EventEmitter<string>(); // Emits search term changes
  @Output() categoryChanged = new EventEmitter<string>(); // Emits category filter changes

  onSearchChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchChanged.emit(inputElement.value); // Emit the search term
  }

  onCategoryChanged(event: Event): void {
    // here we should dispatch an action that will have in its payload the type of document
    // the reducer will take in that return a new state that has only the documents of that type
    // this.store.dispatch(demandeActions.filterOutdemandes({payload : type}))
    const selectElement = event.target as HTMLSelectElement;
    this.categoryChanged.emit(selectElement.value); // Emit the selected category
  }
}
