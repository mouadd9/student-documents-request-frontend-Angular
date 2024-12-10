import { createReducer, on } from "@ngrx/store";
import { statisticsActions } from "./statistics.actions";
import { STATE } from "../state";
import { initialStatisticState } from "./statistics.state";

export const statisticsReducer = createReducer( 
    initialStatisticState, // this reducer will take in the initial state which is passed to the store when teh store loads
    // these are functions that will change state whenever an action is dispatched
    on(statisticsActions.fetchStatistic, (state)=>({
        ...state,
        state : STATE.loading
    })),
    on(statisticsActions.fetchStatisticSuccess, (state, {payload}) => ({
        ...state,
        state : STATE.loaded,
        statistics: payload
    })),
    on(statisticsActions.fetchStatisticError, (state, {payload})=>({
        ...state,
        state : STATE.error,
        errorMessage : payload
    }))

)