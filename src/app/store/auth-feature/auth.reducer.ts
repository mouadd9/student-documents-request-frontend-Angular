// here we will create a reducer that will handle actions related to the authentication feature 

import { createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { initialAuthState } from "./auth.state";
import { STATE } from "../state";

export const authReducer = createReducer(
    initialAuthState, // initial state , passed to the reducer, when the store initializes
    on(authActions.authenticate, (state)=>({
        ...state,
        state : STATE.loading
    })), // if an action of a certain type is dispatched , we will create a new state using the current state
    on(authActions.authenticateSuccessWithClaims, (state, {payload})=>({
        ...state, 
        state : STATE.loaded,
        jwt : payload.jwt ,
        userClaims : payload.userClaims,
        errorMessage: ''
    })),
    on(authActions.authenticateError, (state,{payload})=>({
        ...state,
        state : STATE.error,
        errorMessage: payload
    })),
    on(authActions.logout, () => initialAuthState),
    on(authActions.resetAuthState, (state)=>({
        ...state,
        state : STATE.initial,
        errorMessage : ''
    }))
)