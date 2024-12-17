import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDataState,
  selectDemandesByType,
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

  state$ : Observable<STATE>;
  errorMessage$: Observable<string>;
  demandes$!: Observable<Demande[]>;
  // Observable that combines demandes, state, and errorMessage
  combined$!: Observable<{
    demandes: Demande[];
    state: STATE;
    errorMessage: string;
  }>;
  
  // Add BehaviorSubject for search term
  // A BehaviorSubject is a special type of Observable that holds a current value and always emits that value to new subscribers.
  // In this case, it will hold the search term entered by the user and emit it to components that need it (e.g., the filter logic).
  private searchTermSubject = new BehaviorSubject<string>('');

  // searchTerm$ is an observable that any component can subscribe to in order to receive updates to the search term.
  // We use `asObservable()` to expose the subject as an observable, preventing direct modification of its value outside the class.
  searchTerm$ = this.searchTermSubject.asObservable();


  // Holds the currently selected category
  selectedCategory: TypeDocument | null = null;

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
    this.demandes$ = this.selectedCategory // we will reselect each time an event is emited by the demande nav bar
      ? this.store.select(selectDemandesByType(this.selectedCategory))
      : this.store.select(selectPendingDemandes);
    // we update our observable
    //for the demands search, we add the search logic in here
    this.combined$ = combineLatest([this.demandes$,this.searchTerm$, this.state$, this.errorMessage$]).pipe(
      map(([demandes,searchTerm, state, errorMessage]) => ({
        demandes: demandes.filter(demande =>
          demande.numApogee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          demande.etudiant?.nom?.toLowerCase().includes(searchTerm.toLowerCase())||
          demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())||
          demande.status?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        state,
        errorMessage,
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
onSearchChanged(searchTerm: string): void {
  // Update the BehaviorSubject with the new search term.
  // This will notify any subscribers (like the 'combined$' observable) of the change.
  this.searchTermSubject.next(searchTerm);
}

}
