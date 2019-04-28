import { Adventurer } from 'src/app/models/adventurer/adventurer.type';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartyActionsUnion, PartyActionsEnum } from '../actions/party.actions';
import { defaultAdventurers } from 'src/app/models/adventurer/default-adventurers';
import { filter, findIndex } from 'lodash-es';

export interface PartyState {
  adventurers: Adventurer[];
  nextID: number;
}

const initialState: PartyState = {
  adventurers: defaultAdventurers,
  nextID: defaultAdventurers.length + 1,
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getPartyState = createFeatureSelector<any, PartyState>('party');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getAdventurers = createSelector(
  getPartyState,
  (state) => state.adventurers,
);

/**
 * To be replaced by createReducer and on(Action) with ngrx 8. This allows us to avoid long switch blocks
 */
export function partyReducer(state = initialState, action: PartyActionsUnion) {
  switch (action.type) {

    case PartyActionsEnum.Create: {
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
      };
    }

    case PartyActionsEnum.Update: {
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
      };
    }

    case PartyActionsEnum.Delete: {
      const adventurerID = action.payload.id;
      return {
        ...state,
        adventurers: filter(state.adventurers, a => a.id !== adventurerID),
      };
    }

    default: {
      return state;
    }
  }
}
