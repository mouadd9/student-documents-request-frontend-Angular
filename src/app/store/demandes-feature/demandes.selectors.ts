import { createFeatureSelector, createSelector } from '@ngrx/store';
import { demandeState } from './demandes.state';
import { DemandeStatus } from '../../models/enums/document-status';
import { TypeDocument } from '../../models/enums/document-type';

// if used with the store store.select(featureSelector); it will return an Observable of type demandesState
export const selectDemandesState =
  createFeatureSelector<demandeState>('demandes');

// if used with the store it will return an Observable of type Demande[]
export const selectAllDemandes = createSelector(
  selectDemandesState,
  (state) => state.demandes
);

// if used with the store it will return an Observable of type Demande[] with only specific demandes
export const selectPendingDemandes = createSelector(
  selectAllDemandes,
  (demandes) =>
    demandes.filter((demande) => demande.status === DemandeStatus.EN_ATTENTE)
);
export const selectNonPendingDemandes = createSelector(
  selectAllDemandes,
  (demandes) =>
    demandes.filter((demande) => demande.status !== DemandeStatus.EN_ATTENTE)
);

export const selectDemandesByType = (type: TypeDocument) =>
  createSelector(selectPendingDemandes, (demandes) =>
    demandes.filter((demande) => demande.typeDocument === type)
  );

export const selectSortedNonPendingDemandes = createSelector(
  selectNonPendingDemandes,
  (demandes) => {
    return [...demandes].sort((a, b) => {
      const dateA = a.dateTraitement
        ? parseDate(a.dateTraitement)
        : a.dateCreation
        ? parseDate(a.dateCreation)
        : 0; // Fallback if both are null/undefined

      const dateB = b.dateTraitement
        ? parseDate(b.dateTraitement)
        : b.dateCreation
        ? parseDate(b.dateCreation)
        : 0; // Fallback if both are null/undefined

      return dateB - dateA; // Descending order
    });
  }
);

export const selectNonPendingDemandesByType = (type: TypeDocument) =>
  createSelector(selectSortedNonPendingDemandes, (demandes) =>
    demandes.filter((demande) => demande.typeDocument === type)
  );

export const selectNonPendingDemandesByStatus = (type: DemandeStatus) =>
  createSelector(selectSortedNonPendingDemandes, (demandes) =>
    demandes.filter((demande) => demande.status === type)
  );

export const selectNonPendingDemandesByTypeAndStatus = (
  type: TypeDocument,
  status: DemandeStatus
) =>
  createSelector(selectSortedNonPendingDemandes, (demandes) =>
    demandes.filter(
      (demande) => demande.typeDocument === type && demande.status === status
    )
  );

export const selectDataState = createSelector(
  selectDemandesState,
  (state) => state.demandeState
);
export const selectErrorMessage = createSelector(
  selectDemandesState,
  (state) => state.errorMessage
);

function parseDate(dateString: string): number {
  // Expected format: "dd-mm-yyyy hh:mm:ss"
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hour, minute, second).getTime();
}

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
