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
