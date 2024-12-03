// we will declare the state interface 

import { Reclamation } from "../../models/reclamation";
import { STATE } from "../state";

export interface reclamationState {
    reclamations : Reclamation[],
    state : STATE,
    errorMessage : string
}


// when we first load our app no action is dispatched so we define an initial state and pass it ot the reducer
export const initialStateReclamation: reclamationState = {
    reclamations : [],
    state : STATE.initial,
    errorMessage : ''
}

