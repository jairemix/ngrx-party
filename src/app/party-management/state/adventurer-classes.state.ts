import { AdventurerClass } from '../models/adventurer-class/adventurer-class.type';
import { createFeatureSelector } from '@ngrx/store';

export interface AdventurerClassState {
  classes: AdventurerClass[];
}



/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getAdventurerClassState = createFeatureSelector<any, AdventurerClassState>('adventurerClasses');

