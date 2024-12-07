import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
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
    this.combined$ = combineLatest([this.demandes$, this.state$, this.errorMessage$]).pipe(
      map(([demandes, state, errorMessage]) => ({
        demandes,
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
}
