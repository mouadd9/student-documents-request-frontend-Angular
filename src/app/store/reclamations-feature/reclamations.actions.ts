// here we will define actions : 
// ---- action 1 : 
// saveReclamation : this is an action that has no payload its inly purpose is to change the reclamationState state to LOADING
// saveReclamationSuccess : this is an action dispatched by the effects after the dispatch of save
// it will change the state to LOADED and create a new array with the new created Reclamation

import { createActionGroup, props } from "@ngrx/store";
import { Reclamation } from "../../models/reclamation";


// now we should export a variable of type ActionGroup : 
// this variable will help us get the type of an action
// creates an object of type action ( to pass it to a dispatcher )


export const reclamationActions = createActionGroup({
    source : 'Reclamation', 
    events : { // here we will declare actions
        saveReclamation: props<{payload : Reclamation}>(), // { type : "[Reclamation] save reclamation", payload : { /*reclamation object*/ } }
        saveReclamationSuccess: props<{payload : Reclamation}>(),
        saveReclamationError: props<{payload : string}>()
    }
})