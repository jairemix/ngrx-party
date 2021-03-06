import { PartyState } from './../state/party.state';
// NOTE: new syntax (to use with createReducer in ngrx 8)
// export const createAdventurer = createAction(
//   '[Party Management] Create Adventurer',
//   props<{ adventurer: Adventurer }>(),
// );

import { Adventurer } from '../models/adventurer/adventurer.type';
import { Action } from '@ngrx/store';

export enum PartyActionsEnum {
  LoadParty = '[Party Management] Load Party',
  LoadPartySuccess = '[Party Management] Load Party Success',
  LoadPartyError = '[Party Management] Load Party Error',
  PersistParty = '[Party Management] Persist Party',
  PersistPartySuccess = '[Party Management] Persist Party Success',
  PersistPartyError = '[Party Management] Persist Party Error',
  // also need LoadPartySuccess, LoadPartyError, etc...
  CreateAdventurer = '[Party Management] Create Adventurer',
  UpdateAdventurer = '[Party Management] Update Adventurer',
  DeleteAdventurer = '[Party Management] Delete Adventurer',
}

export class LoadPartyAction implements Action {
  readonly type = PartyActionsEnum.LoadParty;
}

export class LoadPartySuccessAction implements Action {
  readonly type = PartyActionsEnum.LoadPartySuccess;
  party: PartyState;
  constructor(public payload: PartyState) {}
}

export class LoadPartyErrorAction implements Action {
  readonly type = PartyActionsEnum.LoadPartyError;
  constructor(public payload: any) {} // payload is the error
}

export class PersistPartyAction implements Action {
  readonly type = PartyActionsEnum.PersistParty;
}

export class PersistPartySuccessAction implements Action {
  readonly type = PartyActionsEnum.PersistPartySuccess;
}

export class PersistPartyErrorAction implements Action {
  readonly type = PartyActionsEnum.PersistPartyError;
  constructor(public payload: any) {} // payload is the error
}

export class CreateAdventurerAction implements Action {
  readonly type = PartyActionsEnum.CreateAdventurer;
  constructor(public payload: Adventurer) {}
}

export class UpdateAdventurerAction implements Action {
  readonly type = PartyActionsEnum.UpdateAdventurer;
  constructor(public payload: Adventurer) {}
}

export class DeleteAdventurerAction implements Action {
  readonly type = PartyActionsEnum.DeleteAdventurer;
  constructor(public payload: Adventurer) {}
}

export type PartyActionsUnion = LoadPartyAction | LoadPartySuccessAction | LoadPartyErrorAction |
  PersistPartyAction | PersistPartySuccessAction | PersistPartyErrorAction |
  CreateAdventurerAction | UpdateAdventurerAction | DeleteAdventurerAction;
