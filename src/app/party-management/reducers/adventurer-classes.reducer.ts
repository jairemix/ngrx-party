import { AdventurerClassState } from '../state/adventurer-classes.state';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { Action } from '@ngrx/store';

const initialState: AdventurerClassState = {
  classes: adventurerClasses,
};

export function adventurerClassesReducer(state = initialState, _: Action) {
  // no actions
  return state;
}
