import { PartyState } from '../state/party.state';
import { findIndex, filter } from 'lodash-es';
import { createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/party.actions';

const initialState: PartyState = {
  adventurers: [],
  nextID: 1,
  persistState: {},
  loadState: {},
};

export const partyReducer = createReducer<PartyState>(
  initialState,

  on(Actions.loadParty, (state, _) => {
    return {
      ...state,
      loadState: {
        pending: true,
      },
    };
  }),

  on(Actions.loadPartySuccess, (_, action) => {
    return {
      ...action.party,
      loadState: {
        done: true,
      },
      persistState: {
        done: true,
      },
    };
  }),

  on(Actions.loadPartyError, (state, action) => {
    return {
      ...state,
      loadState: {
        ...state.loadState,
        pending: false,
        error: action.error,
      },
    };
  }),

  on(Actions.persistParty, (state, _) => {
    return {
      ...state,
      persistState: {
        pending: true,
      },
    };
  }),

  on(Actions.persistPartySuccess, (state, _) => {
    return {
      ...state,
      persistState: {
        done: true,
      },
    };
  }),

  on(Actions.persistPartyError, (state, action) => {
    return {
      ...state,
      persistState: {
        error: action.error,
      },
    };
  }),

  on(Actions.createAdventurer, (state, action) => {
    const adventurer = {
      ...action.adventurer,
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
  }),

  on(Actions.updateAdventurer, (state, action) => {
    const adventurerID = action.adventurer.id;
    const adventurer = action.adventurer;
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
  }),

  on(Actions.deleteAdventurer, (state, action) => {
    const adventurerID = action.adventurer.id;
    return {
      ...state,
      adventurers: filter(state.adventurers, a => a.id !== adventurerID),
      persistState: {
        done: false,
      }
    };
  }),
);
