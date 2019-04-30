import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { adventurerClasses } from 'src/app/party-management/models/adventurer-class/adventurer-classes.const';
import { keyBy } from 'lodash-es';

export interface AdventurerClassState {
  classes: AdventurerClass[];
}

const initialState: AdventurerClassState = {
  classes: adventurerClasses,
};

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getAdventurerClassState = createFeatureSelector<any, AdventurerClassState>('adventurerClasses');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getAdventurerClasses = createSelector(
  getAdventurerClassState,
  state => state.classes,
);

export const getAdventurerClassDict = createSelector(
  getAdventurerClasses,
  classes => keyBy(classes, 'id'),
);


/**
 */
export function adventurerClassesReducer(state = initialState, action: Action) {
  // only READ, no CUD
  switch (action.type) {
    default: {
      return state;
    }
  }
}
