import { createFeatureSelector } from "@ngrx/store";
import { reclamationState } from "./reclamations.state";


export const selectReclamationState = createFeatureSelector<reclamationState>('reclamations');