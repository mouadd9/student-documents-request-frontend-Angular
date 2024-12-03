// we will declare the state interface 

import { Reclamation } from "../../models/reclamation";
import { STATE } from "../state";

export interface reclamationState {
    declarations : Reclamation[],
    state : STATE,
    errorMessage : string
}


// when we first load our app no action is dispatched so we define an initial state and pass it ot the reducer
export const initialStateReclamation: reclamationState = {
    declarations : [],
    state : STATE.initial,
    errorMessage : ''
}

