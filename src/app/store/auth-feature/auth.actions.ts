// these are the actions dispatched related to authentication 
// authenticate 
// authenticate successful
// authenticate failure
// disconnect 

import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Credentials } from "../../models/credentials";

// an action of type authenticate will have a payload of type credentials 
// when we dispatch authenticate, effects take in the action, and does a side effect using the credentials 
// if the auth is successful an action is dispatched that has a token in its payload 
// this token is used in the new auth state (authenticationState)
/*{
state : STATE.loaded,
token : payload,
errorMessage : ""
}*/


// if an action of type failure is dispatched it will contain an error message that will be shown.

export const authActions = createActionGroup({
    source : "authentication",
    events : {
        // authentication actions , sending credentials, getting a response (token or error message)
        authenticate: props<{payload: Credentials}>(), // this action will be dispatched from the admin-auth section, when we click submit in the form, we will validate the fields then after validation the action will be dispatched and we will pass an object of type credentials
        authenticateSuccessWithClaims: props<{payload : any}>(), // when the effect will detect an action of type authenticate, it conduct an api call (after getting a 200 OK status), we will dispatch this action that will hold the jwt as a string
        authenticateError: props<{payload: string}>(),
        logout: emptyProps(), // this action will reset the state to its initial state 
        // and concurrently we will rout to /login 
        // an action to reset to state to initial
        resetAuthState: emptyProps(),

    }
})