// in order not to subscribe to the global state 
// we will use a selector that will only select a specific slice of the state 
// first we need to define a selector (feature selector that will get a slice of the state defined in the store.module.ts)
// "selectFeatureState"
// this.store.select(selectDeatureState());
// so this selector how do we make it point to a specific state ? 

import { createFeatureSelector } from "@ngrx/store";
import { reclamationState } from "./reclamations.state";


export const selectReclamationState = createFeatureSelector<reclamationState>('reclamations');