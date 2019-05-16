import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartyState } from '../state/party.state';

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

export const getLoadState = createSelector(
  getPartyState,
  (state) => state.loadState,
);

export const getPersistState = createSelector(
  getPartyState,
  (state) => state.persistState,
);
