// here we will create the actions that will be dispatched 

import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Demande } from "../../models/demande";

// Action Groups in NgRx allow you to define related actions under a common namespace (feature)
// we passe an object to createActionGroup 
// this object has two properties : 
// - source property that has the namespace that describes our feature so that teh action type will look like this "[namespace] description"
// - an events property that has an object of actions
export const DemandeActions = createActionGroup({
    source : "Demande", // here we put the namespace
    events: {

        // 1 - actions related to getting demandes from the backend 
        fetchDemandes: emptyProps(),
        fetchDemandesSuccess: props<{payload: Demande[]}>(), 
        fetchDemandesError: props<{payload: string}>(),

        // 2 - actions related to submitting a new demand 
        saveDemande: props<{payload: Demande}>(),// when the student submits a demande this action is dispatched to the store
        saveDemandeSuccess: props<{payload: Demande}>(),
        saveDemandeError: props<{payload: string}>(),

        // 3 - actions related to validating a demand 
        validateDemande: props<{payload : Demande}>(),
        validateDemandeSuccess: props<{payload: Demande}>(),
        validateDemandeError: props<{payload: string}>(),
        
        // 4 - actions related to refusing a demand
        refuseDemande: props<{payload: Demande}>(),
        refuseDemandeSuccess: props<{payload: Demande}>(),
        refuseDemandeError: props<{payload: string}>()

    }
});