import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Statistics } from "../../models/Statistics";



export const statisticsActions = createActionGroup({
    source:'statistics',
    events : {
        fetchStatistic : emptyProps(),
        fetchStatisticSuccess : props<{payload : Statistics}>(),
        fetchStatisticError : props<{payload : string}>(),
    }
})

// the reducer will listen for these actions once they are dispatched and use them to change the state