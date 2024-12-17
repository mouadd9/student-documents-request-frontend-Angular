import { createFeatureSelector, createSelector } from '@ngrx/store';
import { demandeState } from './demandes.state';
import { DemandeStatus } from '../../models/enums/document-status';
import { TypeDocument } from '../../models/enums/document-type';
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

// NOTE !!!!! :
// in our service we reversed the demandes table that we got from the backend
// so that the latest demande is put in the top of the table not the end

// ------------------- Selectors used globally : 
export const selectDemandesState =
  createFeatureSelector<demandeState>('demandes'); // used to select the entire demandes state

export const selectAllDemandes = createSelector(
  selectDemandesState,
  (state) => state.demandes
); // used to select all demandes from the demandes state

export const selectDataState = createSelector(
  selectDemandesState,
  (state) => state.demandeState
); // used to select the state of our demandesState (used to show a loader when transitioning from INITIAL to LOADED or an error when its ERROR)

export const selectErrorMessage = createSelector(
  selectDemandesState,
  (state) => state.errorMessage
); // used to select an errorMessage 



// ------------------- Selectors used in the Demandes Component (we only show pending demands) :
export const selectPendingDemandes = createSelector(
  selectAllDemandes,
  (demandes) =>
    demandes.filter((demande) => demande.status === DemandeStatus.EN_ATTENTE)
); // used to select pending demandes

export const selectDemandesByType = (type: TypeDocument) =>
  createSelector(selectPendingDemandes, (demandes) =>
    demandes.filter((demande) => demande.typeDocument === type)
  ); // used to select pending demandes by type

  // i added a selector that selects demands by search Term
export const selectDemandesBySearchTerm = (searchTerm: string) =>
  createSelector(selectPendingDemandes, (demandes) =>
    demandes.filter(
      (demande) => 
        (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        demande.etudiant?.nom?.toLowerCase().includes(searchTerm.toLowerCase())||
        demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())||
        demande.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // i added a combined selector that selects demandes by Type and search term
export const selectDemandesByTypeAndSearchTerm = ( type: TypeDocument, searchTerm: string ) =>
  createSelector(selectPendingDemandes, (demandes) =>
    demandes.filter(
      (demande) => 
        ((demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        demande.etudiant?.nom?.toLowerCase().includes(searchTerm.toLowerCase())||
        demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())||
        demande.status?.toLowerCase().includes(searchTerm.toLowerCase()) ) && demande.typeDocument === type
    )
  );

// ------------------- Selectors used in the Historique Component (we only show pending demands) :
export const selectNonPendingDemandes = createSelector(
  selectAllDemandes,
  (demandes) =>
    demandes.filter((demande) => demande.status !== DemandeStatus.EN_ATTENTE)
); // used to select non pending demandes (approved/declined)

/* NOTE : 
 - when a demande is created its set automatically to pending.
 - so when we show pending demands they are shown chronologically correct the recent added demande is shown on top (reversed table)
 - but the non pending demands are actually pending demands that were declined or approved in a given time (time of treatment)
 - and practicaly speaking in the "historique" section demands shown should be sorted in a way to show the last approved or declined demand
 - if we approve demand B , then decline demand C , demand C should be shown first as declined then demand B should be shown second as approved
 - to make this happen we need to build a sorting algorith that goes through all non pending demandes and sort them using their date of creation
 - WE DID THAT BELLOW

*/

export const selectSortedNonPendingDemandes = createSelector(
  selectNonPendingDemandes,
  (demandes) => {
    return [...demandes].sort((a, b) => { // here we use the sort method that sorts an array (ascending) using
      const dateA = a.dateTraitement 
        ? parseDate(a.dateTraitement) // here we parse the date so it can be treated as a number 
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
); // used to select sorted non pending demandes (approved/declined) (using the formated treatment date in each demand) 

export const selectNonPendingDemandesByType = (type: TypeDocument) =>
  createSelector(selectSortedNonPendingDemandes, (demandes) =>
    demandes.filter((demande) => demande.typeDocument === type)
  ); // used to select sorted non pending demandes by type 

export const selectNonPendingDemandesByStatus = (type: DemandeStatus) =>
  createSelector(selectSortedNonPendingDemandes, (demandes) =>
    demandes.filter((demande) => demande.status === type)
  ); // used to select sorted non pending demandes by status 


  export const selectNonPendingDemandesBySearchTerm = (searchTerm: string) =>
    createSelector(selectSortedNonPendingDemandes, (demandes) =>
      demandes.filter(
        (demande) => 
          (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.etudiant?.nom && demande.etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.typeDocument && demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.status && demande.status.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    ); // used to select non-pending demandes by SearchTerm

  
  // Selector for filtering non-pending demandes by Type, Status, and Search Term
  export const selectNonPendingDemandesByTypeStatusAndSearchTerm = (
    type: TypeDocument,
    status: DemandeStatus,
    searchTerm: string
  ) =>
    createSelector(selectSortedNonPendingDemandes, (demandes) =>
      demandes.filter((demande) => {
        const matchesType = demande.typeDocument === type;
        const matchesStatus = demande.status === status;
        const matchesSearchTerm =
          (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.etudiant?.nom && demande.etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.typeDocument && demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.status && demande.status.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesType && matchesStatus && matchesSearchTerm;
      })
    );
    
  // Selector for filtering non-pending demandes by Type and Search Term
  export const selectNonPendingDemandesByTypeAndSearchTerm = (
    type: TypeDocument,
    searchTerm: string
  ) =>
    createSelector(selectSortedNonPendingDemandes, (demandes) =>
      demandes.filter((demande) => {
        const matchesType = demande.typeDocument === type;
        const matchesSearchTerm =
          (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.etudiant?.nom && demande.etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.typeDocument && demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.status && demande.status.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesType && matchesSearchTerm;
      })
    );
  
  // Selector for filtering non-pending demandes by Status and Search Term
  export const selectNonPendingDemandesByStatusAndSearchTerm = (
    status: DemandeStatus,
    searchTerm: string
  ) =>
    createSelector(selectSortedNonPendingDemandes, (demandes) =>
      demandes.filter((demande) => {
        const matchesStatus = demande.status === status;
        const matchesSearchTerm =
          (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.etudiant?.nom && demande.etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.typeDocument && demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (demande.status && demande.status.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesStatus && matchesSearchTerm;
      })
    );

export const selectNonPendingDemandesByTypeAndStatus = ( type: TypeDocument, status: DemandeStatus ) =>
  createSelector(selectSortedNonPendingDemandes, (demandes) =>
    demandes.filter(
      (demande) => demande.typeDocument === type && demande.status === status
    )
  ); // used to select sorted non pending demandes by type and status




// ------------------ Helper function to extract the hour minute and second when the demande was treated
//------------------- Then it turns it into a date and then transforms it into a number (ms) 
function parseDate(dateString: string): number {
  // Expected format: "dd-mm-yyyy hh:mm:ss"
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hour, minute, second).getTime();
}


//  export const selectDemandeBySearchKeyState =(searchTerm: String)=> createSelector(
//     selectSortedNonPendingDemandes,

//         (demandes) => {
//           demandes.filter((demande)=>
         
//             demande.numApogee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (demande.email && demande.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             demande.etudiant?.nom?.toLowerCase().includes(searchTerm.toLowerCase())||
//             demande.typeDocument.toLowerCase().includes(searchTerm.toLowerCase())||
//             demande.status?.toLowerCase().includes(searchTerm.toLowerCase())
        
//       )}
//       )