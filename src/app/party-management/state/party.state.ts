import { Adventurer } from '../models/adventurer/adventurer.type';
import { defaultAdventurers } from '../models/adventurer/default-adventurers';

export interface PersistedPartyState {
  adventurers: Adventurer[];
  nextID: number;
}

export interface AsyncState {
  pending?: boolean;
  done?: boolean;
  error?: boolean;
}

export interface PartyState extends PersistedPartyState {
  loadState: AsyncState;
  persistState: AsyncState;
}

export const defaultLoadedPartyState: PersistedPartyState = {
  adventurers: defaultAdventurers,
  nextID: defaultAdventurers.length + 1,
};

export const nonPersistedKeys = ['loadState', 'persistState'] as const;
