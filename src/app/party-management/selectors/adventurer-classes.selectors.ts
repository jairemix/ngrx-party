import { createSelector } from '@ngrx/store';
import { getAdventurerClassState } from '../state/adventurer-classes.state';
import { keyBy } from 'lodash-es';

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
