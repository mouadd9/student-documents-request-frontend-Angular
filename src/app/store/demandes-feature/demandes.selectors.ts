// here we will create a selector for demandes

/*

Selectors are created using functions provided by NgRx:

createFeatureSelector: Used to select a top-level feature state (a slice of the state).
createSelector: Used to select specific parts or compute derived data from one or more slices of state.


*/

// this will create the selector for us
import { createFeatureSelector } from '@ngrx/store';

// now we will import the demandeState interface 
// the state managed by the reducer 
import { demandeState } from './demandes.state';

// this is the selector that we will use with our store
export const selectDemandesState = createFeatureSelector<demandeState>('demandes');
