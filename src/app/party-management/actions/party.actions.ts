// NOTE: new syntax (to use with createReducer in ngrx 8)
// export const createAdventurer = createAction(
//   '[Party Management] Create Adventurer',
//   props<{ adventurer: Adventurer }>(),
// );

import { Adventurer } from '../models/adventurer/adventurer.type';
import { Action } from '@ngrx/store';

export enum PartyActionsEnum {
  Create = '[Party Management Page] Create Adventurer',
  Update = '[Party Management Page] Update Adventurer',
  Delete = '[Party Management Page] Delete Adventurer',
}
export class CreateAdventurerAction implements Action {
  readonly type = PartyActionsEnum.Create;
  constructor(public payload: Adventurer) {}
}

export class UpdateAdventurerAction implements Action {
  readonly type = PartyActionsEnum.Update;
  constructor(public payload: Adventurer) {}
}

export class DeleteAdventurerAction implements Action {
  readonly type = PartyActionsEnum.Delete;
  constructor(public payload: Adventurer) {}
}

export type PartyActionsUnion = CreateAdventurerAction | UpdateAdventurerAction | DeleteAdventurerAction;
