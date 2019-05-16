import { PartyState } from '../state/party.state';
import { PartyActionsUnion, PartyActionsEnum } from '../actions/party.actions';
import { omit, findIndex, filter } from 'lodash-es';

const initialState: PartyState = {
  adventurers: [],
  nextID: 1,
  persistState: {},
  loadState: {},
};

/**
 * To be replaced by createReducer and on(Action) with ngrx 8. This allows us to avoid long switch blocks
 */
export function partyReducer(
  state = initialState,
  action: PartyActionsUnion
): PartyState {
  switch (action.type) {

    case PartyActionsEnum.LoadParty: {
      return {
        ...state,
        loadState: {
          pending: true,
        },
      };
    }

    case PartyActionsEnum.LoadPartySuccess: {
      return {
        ...action.payload,
        loadState: {
          done: true,
        },
        persistState: {
          done: true,
        },
      };
    }

    case PartyActionsEnum.LoadPartyError: {
      return {
        ...state,
        loadState: {
          ...state.loadState,
          pending: false,
          error: action.payload,
        },
      };
    }

    case PartyActionsEnum.PersistParty: {
      return {
        ...state,
        persistState: {
          pending: true,
        },
      };
    }

    case PartyActionsEnum.PersistPartySuccess: {
      return {
        ...state,
        persistState: {
          done: true,
        },
      };
    }

    case PartyActionsEnum.PersistPartyError: {
      return {
        ...state,
        persistState: {
          error: action.payload,
        },
      };
    }

    case PartyActionsEnum.CreateAdventurer: {
      const adventurer = {
        ...action.payload,
        id: state.nextID,
      };
      return {
        ...state,
        adventurers: [
          ...state.adventurers,
          adventurer,
        ],
        nextID: state.nextID + 1,
        persistState: {
          done: false,
        }
      };
    }

    case PartyActionsEnum.UpdateAdventurer: {
      const adventurerID = action.payload.id;
      const adventurer = action.payload;
      const index = findIndex(state.adventurers, a => a.id === adventurerID);
      const adventurers = state.adventurers.slice(0);
      if (index >= 0) {
        adventurers[index] = adventurer;
      }
      return {
        ...state,
        adventurers,
        persistState: {
          done: false,
        }
      };
    }

    case PartyActionsEnum.DeleteAdventurer: {
      const adventurerID = action.payload.id;
      return {
        ...state,
        adventurers: filter(state.adventurers, a => a.id !== adventurerID),
        persistState: {
          done: false,
        }
      };
    }

    default: {
      return state;
    }
  }
}
