import { createFeatureSelector, createSelector } from "@ngrx/store";
import { reclamationState } from "./reclamations.state";
import { ReclamationStatus } from "../../models/enums/reclamation-status";


export const selectReclamationState = createFeatureSelector<reclamationState>('reclamations');
export const selectPendingReclamationsState = createSelector(
    selectReclamationState,
    (state) => ({
      ...state,
      reclamations: state.reclamations.filter(
        (reclamation) => reclamation.status === ReclamationStatus.EN_ATTENTE
      ),
    })
  );
  export const selectReclamationsBySearchKeyState =(searchTerm: string)=> createSelector(
    selectPendingReclamationsState,
    (state) => ({
      ...state,
      reclamations: state.reclamations.filter(
        (reclamation) => {
          return(
            reclamation.numApogee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (reclamation.email && reclamation.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            reclamation.etudiant?.nom?.toLowerCase().includes(searchTerm.toLowerCase())||
            // reclamation.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())||
            reclamation.status?.toLowerCase().includes(searchTerm.toLowerCase())
        
      )}
      ),
    })
  );
