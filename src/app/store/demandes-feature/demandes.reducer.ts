import { Action } from '@ngrx/store';
import { STATE } from '../state';
import { DemandeActions } from './demandes.actions';
import { demandeState } from './demandes.state';
import { initialDemandeState } from './demandes.state';

// Whenever an action related to demands is dispatched either from a component or Effects
// the reducer is evoked in order to create a new state and return it to the store

export function demandeReducer( demandeState: demandeState = initialDemandeState, action: Action ): demandeState {
  switch (action.type) {

    //1- fetchDemandes actions
    case DemandeActions.fetchDemandes.type: {
      return { ...demandeState, demandeState: STATE.loading };
    }
    case DemandeActions.fetchDemandesSuccess.type: {
      return {
        ...demandeState,
        demandeState: STATE.loaded,
        demandes: (action as any).payload,
      };
    }
    case DemandeActions.fetchDemandesError.type: {
      return {
        ...demandeState,
        demandeState: STATE.error,
        errorMessage: (action as any).payload,
      };
    }

    //2- saveDemande actions
    case DemandeActions.saveDemande.type: {
      return { ...demandeState, demandeState: STATE.loading };
    }
    case DemandeActions.saveDemandeSuccess.type: {
      return {
        ...demandeState,
        demandeState: STATE.loaded,
        demandes: [(action as any).payload, ...demandeState.demandes],
      };
    }
    case DemandeActions.saveDemandeError.type: {
      return {
        ...demandeState,
        demandeState: STATE.error,
        errorMessage: (action as any).payload,
      };
    }

    //3- resetDemande action
    case DemandeActions.resetDemandeStateEnum.type: {
      return { ...demandeState, demandeState: STATE.initial, errorMessage: '' };
    }

    //4- validateDemande actions
    case DemandeActions.validateDemande.type: {
      return { ...demandeState, demandeState: STATE.loading };
    }
    case DemandeActions.validateDemandeSuccess.type: {
      return {
        ...demandeState,
        demandeState: STATE.loaded,
        demandes: demandeState.demandes.map((demande) => {
          if (demande.id === (action as any).payload.id) {
            return (action as any).payload;
          } else {
            return demande;
          }
        }),
      };
    }
    case DemandeActions.validateDemandeError.type: {
        return {...demandeState, errorMessage:(action as any).payload, demandeState:STATE.error};
    }

    //5- refuseDemande actions
    case DemandeActions.refuseDemande.type: {
        return { ...demandeState, demandeState: STATE.loading };
    }
    case DemandeActions.refuseDemandeSuccess.type: {
        return {
          ...demandeState,
          demandeState: STATE.loaded,
          demandes: demandeState.demandes.map((demande) => {
            if (demande.id === (action as any).payload.id) {
              return (action as any).payload;
            } else {
              return demande;
            }
          }),
        };
    }
    case DemandeActions.refuseDemandeError.type: {
          return {...demandeState, errorMessage:(action as any).payload, demandeState:STATE.error};
    }

    // 6 - downloadDemande actions
    case DemandeActions.downloadDemand.type: {
          return {...demandeState, demandeState:STATE.loading};
    }
    case DemandeActions.downloadDemandSuccess.type: {
          return {...demandeState, demandeState:STATE.loaded};
    }
    case DemandeActions.downloadDemandError.type: {
          return {...demandeState, errorMessage:(action as any).payload, demandeState:STATE.error};
    }

    default: {
      return demandeState;
    }
  }
}
