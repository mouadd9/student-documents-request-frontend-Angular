import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPendingReclamationsState, selectReclamationState } from '../../../store/reclamations-feature/reclamations.selectors';
import { reclamationState } from '../../../store/reclamations-feature/reclamations.state';
import { reclamationActions } from '../../../store/reclamations-feature/reclamations.actions';


@Component({
    selector: 'app-reclamations',
    templateUrl: './reclamations.component.html',
    styleUrl: './reclamations.component.css',
    standalone: false
})
export class ReclamationsComponent {

  reclamationsState$!: Observable<reclamationState>; // this observable is passed to a child element

  constructor(private store: Store) {}

  ngOnInit(): void { 
    // first we select the specific observable we need, subscribing to this observable will provide us with a continous stream of state over time
    // so that whenever the selected state changes in the store using a reducer , the new state is emitted via the store
    this.reclamationsState$ = this.store.select(selectPendingReclamationsState); 
    // here we dispatch an action that will lead to a change in state, and will get us new state
    this.store.dispatch(reclamationActions.fetchReclamation());
  }
}