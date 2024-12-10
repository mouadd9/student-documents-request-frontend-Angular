// in our global store we will have rn an object that will store this 

import { createFeatureSelector } from "@ngrx/store";
import { authState } from "./auth.state";

// token = { 'access-token' : '.......'} ;
export const selectTokenState = createFeatureSelector<authState>('token');