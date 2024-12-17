// here i will create two effects one that will perform an api call (post declaration)
// and one that will reset the reclamation state to initial

import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, mergeMap, Observable, of } from "rxjs"
import { Action } from "@ngrx/store";
import { reclamationActions } from "./reclamations.actions";
import { ReclamationService } from "../../services/reclamation.service";



@Injectable()
export class reclamationsEffects {
    // dependencies
    private actions$: Actions;
    private reclamationService: ReclamationService;

    // properties 
    saveReclamationEffect$: Observable<Action>; 
    saveReclamationSuccessEffect$: Observable<Action>; 
    fetchReclamationEffect$: Observable<Action>;
    respondReclamationEffect$: Observable<Action>;

    constructor (actions$: Actions, reclamationService: ReclamationService) {

        this.actions$ = actions$;
        this.reclamationService = reclamationService;

        this.saveReclamationEffect$ = createEffect(() => // now we need to return an Observable of type Action that has actions of type success
            this.actions$.pipe( // we need to filter out specific actions 
                ofType(reclamationActions.saveReclamation), 
                mergeMap( // then for each specific action in the stream of actions we will fetch an observable
                    // we will pipe throu that observable and map it to create an action
                    (action) => {
                          return this.reclamationService.saveReclamationAsync(action.payload).pipe(
                            map((reclamation) => reclamationActions.saveReclamationSuccess({payload: reclamation})),
                            catchError((err) => of(reclamationActions.saveReclamationError({ payload: err.error.message })))
                          )
                    }

                )
            )
        )

        this.saveReclamationSuccessEffect$ = createEffect(() => 
            this.actions$.pipe(
                ofType(reclamationActions.saveReclamationSuccess),
                        delay(3000),
                
                mergeMap(
                    () => {
                        return of(reclamationActions.resetReclamation()); // for each action we will return an observable
                    }
                )
            )
        )

        this.fetchReclamationEffect$ = createEffect(()=>
           this.actions$.pipe(
            ofType(reclamationActions.fetchReclamation),
            mergeMap(
                () => this.reclamationService.fetchAllReclamations().pipe(
                    map((reclamations)=> reclamationActions.fetchReclamationSuccess({payload : reclamations})),
                    catchError((err)=> of(reclamationActions.fetchReclamationError({payload : err.message})))
                )
            )
           )
        )

        this.respondReclamationEffect$ = createEffect(()=>
            this.actions$.pipe(
                ofType(reclamationActions.respondReclamation),
                mergeMap(
                    (action) => this.reclamationService.updateReclamationAsync(action.payload).pipe(
                        map((reclamation)=>reclamationActions.respondReclamationSuccess({payload:reclamation})),
                        catchError((err)=>of(reclamationActions.respondReclamationError({payload: err.message})))
                    )

                )
            )
        )

    }

}