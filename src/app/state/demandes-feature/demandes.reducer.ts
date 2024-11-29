import { Action } from "@ngrx/store";
import { Demande } from "../../models/demande";
import { STATE } from "../state";
import { DemandeActions } from "./demandes.actions";
import { demandeState } from "./demandes.state"
import { initialDemandeState } from "./demandes.state"

// this function will take an initial state and an Action
// then it will return a new state

// when the first action is dispatched we pass in the initial state 
// then the store will pass current state 
export function demandeReducer(
    demandeState: demandeState = initialDemandeState, 
    action: Action
 ): demandeState {

    // depending on the action.type we return a new state

    switch (action.type) {

        //1- here we treat the state changes by the fetch actions 

       case DemandeActions.fetchDemandes.type : {
        return {...demandeState, demandeState : STATE.loading};

       }
       case DemandeActions.fetchDemandesSuccess.type : {
        return {...demandeState, demandeState : STATE.loaded, demandes : (action as any).payload};
       }

       // if an action of type fetch demande error is dispatched, that action's payload contains the errormessage
       case DemandeActions.fetchDemandesError.type : {
        return {...demandeState, demandeState : STATE.error, errorMessage : (action as any).payload};

       }


       //2- here we treat the state changes by the post demande actions 

       case DemandeActions.saveDemande.type: {
        return {...demandeState, demandeState : STATE.loading }
       }
       case DemandeActions.saveDemandeSuccess.type: {
        // here will push the new demande recieved into the demandes array using the spread operator
        return {...demandeState, demandeState : STATE.loaded , demandes: [(action as any).payload,...demandeState.demandes]}
       }

       case DemandeActions.saveDemandeError.type: {
        // here will push the new demande recieved into the demandes array using the spread operator
        return {...demandeState, demandeState : STATE.error , errorMessage: (action as any).payload}
       }

       default: {

        return demandeState ;
       }
        
    } 
     
     
}