import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDataState,
  selectDemandesBySearchTerm,
  selectDemandesByType,
  selectDemandesByTypeAndSearchTerm,
  selectErrorMessage,
  selectPendingDemandes,
} from '../../../store/demandes-feature/demandes.selectors';
import { Demande } from '../../../models/demande';
import { STATE } from '../../../store/state';
import { TypeDocument } from '../../../models/enums/document-type';
import { DemandeActions } from '../../../store/demandes-feature/demandes.actions';

@Component({
  selector: 'app-demandes',
  standalone: false,
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css',
})

// this component will dispatch a fetch demands actions
// and will use specific selectors to get observables for specific demandes
export class DemandesComponent {

  // Holds the currently selected category
  selectedCategory: TypeDocument | null = null;
  // Holds the currently selected searchTerm
  searchTerm: string | null = null;

  // observables 
  state$ : Observable<STATE>;
  errorMessage$: Observable<string>;
  demandes$!: Observable<Demande[]>;

  // Observable that combines demandes, state, and errorMessage
  combined$!: Observable<{
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }>;

  // we will select the the parts of the state that only have one selector
  constructor(private store: Store) {
    this.state$ = this.store.select(selectDataState);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  // after the creation of the component
  ngOnInit(): void {
    // Dispatch an action to fetch demandes when the component initializes
    this.store.dispatch(DemandeActions.fetchDemandes());
    // Initialize the combined observable
    this.initializeCombinedObservable();
  }

  private initializeCombinedObservable(): void {
    if (this.selectedCategory && this.searchTerm) {
      // Both category and search term are set
      this.demandes$ = this.store.select(selectDemandesByTypeAndSearchTerm(this.selectedCategory, this.searchTerm));
    } else if (this.selectedCategory) {
      // Only category is set
      if (this.selectedCategory === null) { // Handle "ALL" represented by empty string
        this.demandes$ = this.store.select(selectPendingDemandes);
      } else {
        this.demandes$ = this.store.select(selectDemandesByType(this.selectedCategory));
      }
    } else if (this.searchTerm) {
      // Only search term is set
      this.demandes$ = this.store.select(selectDemandesBySearchTerm(this.searchTerm));
    } else {
      // Neither category nor search term is set
      this.demandes$ = this.store.select(selectPendingDemandes);
    }

    this.combined$ = combineLatest([this.demandes$, this.state$, this.errorMessage$]).pipe(
      map(([demandes, state, errorMessage]) => ({
        demandes,
        state,
        errorMessage
      }))
    );

  }

  // Handle category change events
  onCategoryChanged(category: TypeDocument | null): void {
    this.store.dispatch(DemandeActions.fetchDemandes());
    this.selectedCategory = category;
    this.initializeCombinedObservable();
  }

  // This method is called whenever the search term changes (e.g., when the user types in the search input field).
  onSearchChanged(searchTerm: string | null): void {
    this.searchTerm = searchTerm;
    this.initializeCombinedObservable();
  }

}
