import { Reclamation } from "../../models/reclamation";
import { STATE } from "../state";

export interface reclamationState {
    reclamations : Reclamation[],
    state : STATE,
    errorMessage : string
}

export const initialStateReclamation: reclamationState = {
    reclamations : [],
    state : STATE.initial,
    errorMessage : ''
}

