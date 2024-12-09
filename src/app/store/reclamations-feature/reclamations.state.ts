import { Reclamation } from "../../models/reclamation";
import { STATE } from "../state";

export interface reclamationState {
    state : STATE,
    reclamations : Reclamation[],
    errorMessage : string,
    respondLoading: boolean;
}

export const initialStateReclamation: reclamationState = {
    state : STATE.initial,
    reclamations : [],
    errorMessage : '',
    respondLoading : false
}

