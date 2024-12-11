import { STATE } from "../state";

export interface authState {
    state: STATE;
    jwt: string;
    errorMessage: string;
    userClaims: { roles: string[]; username: string; };

}

export const initialAuthState: authState = {
    state: STATE.initial,
    jwt : '',
    errorMessage: '',
    userClaims: { roles: [], username: '' }
} 