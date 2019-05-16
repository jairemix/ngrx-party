import { AdventurerClassState } from '../state/adventurer-classes.state';
import { adventurerClasses } from '../models/adventurer-class/adventurer-classes.const';
import { createReducer } from '@ngrx/store';

const initialState: AdventurerClassState = {
  classes: adventurerClasses,
};

// no actions
export const adventurerClassesReducer = createReducer<AdventurerClassState>(initialState);
