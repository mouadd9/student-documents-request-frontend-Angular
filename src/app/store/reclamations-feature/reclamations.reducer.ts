import { Action, createReducer, on } from "@ngrx/store";
import { initialStateReclamation, reclamationState } from "./reclamations.state";
import { reclamationActions } from "./reclamations.actions";
import { STATE } from "../state";


export const reclamationsReducer = createReducer(
    // first we put the initial state 
    initialStateReclamation,
    // then for each action we return a specific state
    // on(action, function), this function takes in the current state , and the payload of the dispatched action then returns a new state 
    on(reclamationActions.saveReclamation, (state) => ({
        ...state,
        state: STATE.loading
    })), // there is no playload in saveReclamation
    on(reclamationActions.saveReclamationSuccess, (state, { payload }) => ({
        ...state,
        state: STATE.loaded,
        reclamations: [payload, ...state.reclamations]
    })),// we put the type of the action then we put in parameters the current state and then payload of the action 
    on(reclamationActions.saveReclamationError, (state, { payload }) => ({
        ...state,
        state: STATE.error,
        errorMessage: payload
    })),
    on(reclamationActions.resetReclamation,(state) => ({
        ...state,
        state: STATE.initial
    })),
    on(reclamationActions.fetchReclamation, (state)=>({
        ...state,
        state:STATE.loading
    })),
    on(reclamationActions.fetchReclamationSuccess,(state, { payload } ) => ({
        ...state,
        reclamations : payload,
        state : STATE.loaded
    })),
    on(reclamationActions.fetchReclamationError,(state, { payload })=>({
        ...state, 
        state : STATE.error,
        errorMessage : payload
    })),
    on(reclamationActions.respondReclamation,(state) => ({
        ...state,
        state : STATE.loading,
        respondLoading : true
    })),
    on(reclamationActions.respondReclamationSuccess,(state, {payload})=> ({
        ...state,
        reclamations : state.reclamations.map((reclamation)=> reclamation.id === payload.id? payload : reclamation ),
        state : STATE.loaded,
        respondLoading : false,

    })),
    on(reclamationActions.respondReclamationError, (state, {payload}) => ({
        ...state,
        state: STATE.error,
        errorMessage: payload,
        respondLoading : false
    }) )
)

//-------------------------OLD METHOD

/*
export function reclamationsReducer(action : Action, currentState : reclamationState = initialStateReclamation): reclamationState {
    switch (action.type) {
        // state changes regarding saving a reclamation
        case reclamationActions.saveReclamation.type:
            return {...currentState, state: STATE.loading}; // we will return a new state object   
        break;
        case reclamationActions.saveReclamationSuccess.type: // this dipatched action has a payload of type Reclamation (the reclamation returned by the backend)
            return {...currentState, reclamations: [(action as any).payload, ...currentState.reclamations], state: STATE.loaded }; // here we will add the reclamation to the array of reclamations
        break;
        case reclamationActions.saveReclamationError.type: // this dispatched action contains an error message
            return {...currentState, state: STATE.error, errorMessage: (action as any).payload };
        break;
        case reclamationActions.resetReclamation.type: 
            return {...currentState, state: STATE.initial};
        break;
        default:
            return {...currentState};
        break;
    }


}

*/
