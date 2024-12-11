// in our global store we will have rn an object that will store this 

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "./auth.state";

// token = { 'access-token' : '.......'} ;
export const selectAuthState = createFeatureSelector<authState>('token');

export const selectJwtToken = createSelector(selectAuthState, (state) => state.jwt);

export const selectUserClaims = createSelector(selectAuthState, (state) => state.userClaims); // this will be used to show the username and role in the nav bar

// now these selectors will be used to get the jwt and userclaims in real time , after each change in state 
// if the user authenticated successfuly the state will change, containing both the jwt and the claims