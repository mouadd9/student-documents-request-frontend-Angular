// here we will define the blue print (interface) of what the state will look like 
// for this feature (demandes)

import { Demande } from "../../models/demande";
import { STATE } from "../state";

// and the initial state 
// this will defines the shape of an object. 
// we will use to structure the state object that the Store stores

// interface demandeState (declares an interface called demandeState)
// properties the object shoudl have 
    // the demande state will contains : 
    // ------ the actual data (demandes)
    // ------ the state of this data (loading, loaded or ERROR id an error occured)
    // ------ the error message in case an ERROR occured

export interface demandeState {    
    demandes: Demande [],
    demandeState: STATE,
    errorMessage: string
}

// before we do any actions the initial state is : 
export const initialDemandeState: demandeState = { 
    demandes: [],
    demandeState: STATE.initial,
    errorMessage: ""
} 


// where will each this state be used 
// so when we perform ection we will change this state 
// and when we change this state components will react to it 