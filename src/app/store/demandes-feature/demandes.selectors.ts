/*
we use selectors with our store to get specific slices of data as Observables
selectors can also tranform the data we get from the store

createFeatureSelector: Used to select a top-level feature state (a slice of the state).
example : store.select(featureSelector); i will get an Observable<feature> it will only have the state i need

createSelector: Used to select specific parts or compute derived data from one or more slices of state.
this type of selector helps us access specific properties of a state
you give it an input and a condition


examplle : 
let us say i have a state like this : 
{
state : ENUM,
demandes : Demand [],
errorMessage : string
}

let us say i only wan to get demands  ( we need to create a feature selector that gets everything)

  // this selector returns an Observable that has the entirity of the state 
export const demandesStateSelector = createFeatureSelector<DemandeState>('demande');
  // this selector has takes in the previous selector that has all the state and filters it out to only select a specific property
export const demandesSelector = createSelector(demandesStateSelector, (state) => state.demandes );
  // then if we need pending demandes we will use the previous selector that selects all demands and filterout specific demands
export const pendingDemandsSelector = createSelector(demandesSelector, (demandes) => demandes.filter((demande) => demande.status === en_attente));

*/

// this will create the selector for us
import { createFeatureSelector, createSelector } from '@ngrx/store';

// now we will import the demandeState interface 
// the state managed by the reducer 
import { demandeState } from './demandes.state';
import { DemandeStatus } from '../../models/enums/document-status';
import { TypeDocument } from '../../models/enums/document-type';

// if used with the store store.select(featureSelector); it will return an Observable of type demandesState
export const selectDemandesState = createFeatureSelector<demandeState>('demandes');

// if used with the store it will return an Observable of type Demande[]
export const selectAllDemandes = createSelector(selectDemandesState, (state) => state.demandes);

// if used with the store it will return an Observable of type Demande[] with only specific demandes
export const selectPendingDemandes = createSelector(selectAllDemandes, (demandes) => demandes.filter(demande => demande.status === DemandeStatus.EN_ATTENTE));
export const selectNonPendingDemandes = createSelector(selectAllDemandes, (demandes) => demandes.filter(demande => demande.status !== DemandeStatus.EN_ATTENTE) );

export const selectDemandesByType = (type: TypeDocument) =>
    createSelector(selectPendingDemandes, (demandes) =>
      demandes.filter((demande) => demande.typeDocument === type)
    );

export const selectNonPendingDemandesByType = (type: TypeDocument) => 
  createSelector(selectNonPendingDemandes, (demandes) => 
  demandes.filter((demande) => demande.typeDocument === type)
  ); // this will select non pending demandes of a specific, when the user choses a document type

export const selectNonPendingDemandesByStatus = (type: DemandeStatus ) => 
  createSelector(selectNonPendingDemandes, (demandes) => 
  demandes.filter((demande)=> demande.status === type)
);

export const selectNonPendingDemandesByTypeAndStatus = (type: TypeDocument, status: DemandeStatus) => 
  createSelector(selectNonPendingDemandes, (demandes) => 
    demandes.filter((demande) => demande.typeDocument === type && demande.status === status)
  );


export const selectDataState = createSelector(selectDemandesState, (state) => state.demandeState);
export const selectErrorMessage = createSelector(selectDemandesState, (state) => state.errorMessage);

// i need a selector that gets all non pending demandes


// insight : 
/*
these selectors will be used by the store to return specific observables
that will be subscribed to in the template 
example : 
 - let us say we have a list and a nav bar
 - the nav bar controls the elements shown in the list 
 - meaning we will first collect an observable using the selector that gets all demandes
 - then we will switch the demandes shown using the selectors following the user's actions
 - we will also subscribe to the Data State and use it to know if the data is loading

*/