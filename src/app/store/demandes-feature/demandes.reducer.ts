import { Action } from '@ngrx/store';
import { STATE } from '../state';
import { DemandeActions } from './demandes.actions';
import { demandeState } from './demandes.state';
import { initialDemandeState } from './demandes.state';

export function demandeReducer(
  demandeState: demandeState = initialDemandeState,
  action: Action
): demandeState {
  // depending on the action.type we return a new state
  switch (action.type) {
    //1- here we treat the state changes by the fetchDemandes actions
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

    //2- here we treat the state changes by the saveDemande actions
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

    case DemandeActions.resetDemandeStateEnum.type: {
      return { ...demandeState, demandeState: STATE.initial, errorMessage: '' };
    }

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

    default: {
      return demandeState;
    }
  }
}
