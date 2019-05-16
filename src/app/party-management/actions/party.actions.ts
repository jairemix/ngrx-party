import { PersistedPartyState } from './../state/party.state';
import { Adventurer } from '../models/adventurer/adventurer.type';
import { createAction, props } from '@ngrx/store';

export const loadParty = createAction('[Party Management] Load Party');
export const loadPartySuccess = createAction('[Party Management] Load Party Success', props<{ party: PersistedPartyState }>());
export const loadPartyError = createAction('[Party Management] Load Party Error', props<{ error: any }>());

export const persistParty = createAction('[Party Management] Persist Party');
export const persistPartySuccess = createAction('[Party Management] Persist Party Success');
export const persistPartyError = createAction('[Party Management] Persist Party Error', props<{ error: any }>());

export const createAdventurer = createAction('[Party Management] Create Adventurer', props<{ adventurer: Adventurer }>());
export const updateAdventurer = createAction('[Party Management] Update Adventurer', props<{ adventurer: Adventurer }>());
export const deleteAdventurer = createAction('[Party Management] Delete Adventurer', props<{ adventurer: Adventurer }>());
