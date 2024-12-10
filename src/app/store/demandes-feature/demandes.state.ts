import { Demande } from "../../models/demande";
import { STATE } from "../state";

// this shapes the state stored in our store
// the objects returned by the reducer should adhere to this interface  
export interface demandeState {    
    demandeState: STATE,
    demandes: Demande [],
    errorMessage: string
}

// before we do any actions the initial state is : 
export const initialDemandeState: demandeState = {
    demandeState: STATE.initial,
    demandes: [],
    errorMessage: ""
} 