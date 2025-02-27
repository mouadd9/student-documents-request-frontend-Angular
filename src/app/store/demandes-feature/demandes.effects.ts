import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { catchError, delay, map, mergeMap, Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DemandeActions } from './demandes.actions';
import { DemandeService } from '../../services/demande.service';
import { HttpErrorResponse } from '@angular/common/http';

// - the effects encounters a specific action
// - the effects does an async operation using a method in our service
// - then merges the response into the stream of data that we will store in our property
// - this property is used by the store to dispatche actions of either sucess or failure

@Injectable()
export class DemandesEffects {
  private action$: Actions;
  private demandeService: DemandeService;

  // here we declare the observable of type Action
  // the labeling here is important , this is considered an effect for what ?  for fetching Data ,
  // it does an asynchronious operation with side effects (fetching data)
  fetchDemandeEffect$: Observable<Action>;
  saveDemandeEffect$: Observable<Action>;
  saveDemandeSuccessEffect$: Observable<Action>;
  validateDemandeEffect$: Observable<Action>;
  refuseDemandeEffect$: Observable<Action>;
  downloadDemandEffect$:Observable<Action>;

  constructor(action$: Actions, demandeService: DemandeService) {
    // here we will inject the stream of Actions
    this.action$ = action$;
    (this.demandeService = demandeService),
      // effect 1 :

      // now that we injected the stream of actions we will create our effects
      (this.fetchDemandeEffect$ = createEffect(() =>
        // first we use pipe to operate on the actions in the stream
        this.action$.pipe(
          ofType(DemandeActions.fetchDemandes), // for each action in this stream we will filter out only the ones that are of this type
          mergeMap(() => {
            // now for each action of this type we will make an async operation that will return an observable
            return this.demandeService.fetchDemandesAsync().pipe(
              // demandeService.fetchDemandesAsync() return an Observable<Demande[]>
              // now we will change the type of return to Action
              map(
                // map , takes in each data emitted into the stream and transforms it (it transforms the type of observable)
                (demandes) => {
                  return DemandeActions.fetchDemandesSuccess({
                    payload: demandes,
                  });
                }
              ),
              catchError((err) =>
                of(DemandeActions.fetchDemandesError({ payload: err.message }))
              )
            );
          })
        )
      ));

    // effect 2:

    this.saveDemandeEffect$ = createEffect(() =>
      this.action$.pipe(
        ofType(DemandeActions.saveDemande),
        mergeMap((action) =>
          this.demandeService.saveDemandeAsync(action.payload).pipe(
            map((demande) =>
              DemandeActions.saveDemandeSuccess({ payload: demande })
            ),
            catchError((err : HttpErrorResponse) => {
              return of(DemandeActions.saveDemandeError({ payload: err.error.message }))
            }
            )
          )
        )
      )
    );

    // effect 3:
    // if an action of type saveDemandeSuccess is dispatched we should dispatch action of type saveDemandeReset
    // so that the user can know he's allowed to dispatch a saveDemand Action

    this.saveDemandeSuccessEffect$ = createEffect(() =>
      // so each time a user clicks on a button "Envoyer une demande" and the action is successful
      // we should reset the state so that he can resend it again
      this.action$.pipe(
        ofType(DemandeActions.saveDemandeSuccess),
        delay(3000),
        mergeMap(() => of(DemandeActions.resetDemandeStateEnum()))
      )
    );

    this.validateDemandeEffect$ = createEffect(() =>
      this.action$.pipe(
        ofType(DemandeActions.validateDemande),
        mergeMap((action) =>
          this.demandeService.validateDemandeAsync(action.payload).pipe(
            map((validatedDemande) =>
              DemandeActions.validateDemandeSuccess({
                payload: validatedDemande,
              })
            ),
            catchError((err) =>
              of(DemandeActions.validateDemandeError({ payload: err.error.message }))
            )
          )
        )
      )
    );

    this.refuseDemandeEffect$ = createEffect(() =>
        this.action$.pipe(
          ofType(DemandeActions.refuseDemande),
          mergeMap((action) =>
            this.demandeService.refuseDemandeAsync(action.payload).pipe(
              map((refusedDemande) =>
                DemandeActions.refuseDemandeSuccess({
                  payload: refusedDemande,
                })
              ),
              catchError((err) =>
                of(DemandeActions.validateDemandeError({ payload: err.message }))
              )
            )
          )
        )
      );
      
      this.downloadDemandEffect$ = createEffect(() =>
        this.action$.pipe(
          ofType(DemandeActions.downloadDemand),
          mergeMap((action) => {
            const demande = action.payload;
            return this.demandeService.downloadDemande(demande).pipe(
              map((response: Blob) => {
                const filename = demande.etudiant 
                      ? `${demande.etudiant.nom}_${demande.typeDocument}.pdf`
                      : `defaultName_${demande.typeDocument}.pdf`;
                const link = document.createElement('a');
                link.href = URL.createObjectURL(response);
                link.download = filename; 
                link.click();
                URL.revokeObjectURL(link.href); 
                return DemandeActions.downloadDemandSuccess(); // Dispatch success action
              }),
              catchError((error) => 
                of(DemandeActions.downloadDemandError({ payload: error.message })) // Dispatch error if the download fails
              )
            );
          })
        )
      );
  }
}

/*
 so what happened here exactly ? 

 actions$ this is an onservable when we subscribe to it we get all events that are emitted through 
 we filter out only events of a specific type, so now the stream only has specific events 
 than for each event , we use mergeMap
 for each event mergeMap sunscribes to another stream and merges the events from that stream into the onr we are returning 
 we use map to kinda shape the events returned by MergMap to be of type Action  
 
 */
