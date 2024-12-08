import { Component, Input } from '@angular/core';
import { Reclamation } from '../../../models/reclamation';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectReclamationState } from '../../../store/reclamations-feature/reclamations.selectors';
import { reclamationState } from '../../../store/reclamations-feature/reclamations.state';
import { reclamationActions } from '../../../store/reclamations-feature/reclamations.actions';


@Component({
  selector: 'app-reclamations',

  templateUrl: './reclamations.component.html',
  styleUrl: './reclamations.component.css'
})
export class ReclamationsComponent {

  reclamationsState$!: Observable<reclamationState>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(reclamationActions.fetchReclamation());// here we dispatch an action that changes the state (LOADING -> LOADED / ERROR)
    this.reclamationsState$ = this.store.select(selectReclamationState); // in this case we select the whole state (the observable representes a stream of the state object)
  }
}
