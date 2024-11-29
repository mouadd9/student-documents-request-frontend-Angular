import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'
import { demandeReducer } from './demandes-feature/demandes.reducer';


// here we will import the store and configure it with a the reducer for the demande feature

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // When the store is initialized, it creates an empty object for the global state.
    // each registered reducer provides the store with an initial slice of state
    /*store : 
     {
      demandes : {demandes: [], demandesState : state.INITIAL, errorMessage : "" }, // this is modified via its reducer , each time an action is dispatched we change this 
      reclamations : {reclamations: [], reclamationsState : state.INITIAL, errorMessage : "" } // this is modified via its reducer
     } 
    */
    StoreModule.forFeature('demandes', demandeReducer), // its like saying hey reducer you manage this slice of state 
    // StoreModule.forFeature('reclamations', reclamationReducer)
    
  ]
})
export class StateModule { }


/*
When an action is dispatched the following happens : 
  - teh action is broadcasted to all reducers 
  - each reducers passes the action and the current state in its parameters
  - the reducer uses the dispatched action , and uses teh current state, each reducer is mapped to a slice of state 
  - that slice of state in the store provides the reducer with the current state 

*/

/*
so we should do the following : 
 - we create reducers
 - associate them to specific slices of state (the state affected by the reducer)
 - declare an initial state in the reducer and pass it 
 - and then create logic of how the state will change depending on the action types dispatched

*/