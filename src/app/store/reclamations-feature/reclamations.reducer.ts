import { Action } from "@ngrx/store";
import { initialStateReclamation, reclamationState } from "./reclamations.state";
import { reclamationActions } from "./reclamations.actions";
import { STATE } from "../state";


// when an action is dispatched to the store its sent here
// each time an action is dispatched the current state (the value of the data slice for reclamation) is passed in as an argument 
export function reclamationsReducer(action : Action, currentState : reclamationState = initialStateReclamation): reclamationState {
    switch (action.type) {
        // state changes regarding saving a reclamation
        case reclamationActions.saveReclamation.type:
            return {...currentState, state: STATE.loading}; // we will return a new state object   
        break;
        case reclamationActions.saveReclamationSuccess.type: // this dipatched action has a payload of type Reclamation (the reclamation returned by the backend)
            return {...currentState, reclamations: [(action as any).payload, ...currentState.reclamations], state: STATE.loaded }; // here we will add the reclamation to the array of reclamations
        break;
        case reclamationActions.saveReclamationError.type: // this dispatched action contains an error message
            return {...currentState, state: STATE.error, errorMessage: (action as any).payload };
        break;
        case reclamationActions.resetReclamation.type: 
            return {...currentState, state: STATE.initial};
        break;


    
        default:
            return {...currentState};
        break;
    }


}