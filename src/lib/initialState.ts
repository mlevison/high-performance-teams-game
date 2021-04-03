import type { GameState } from '../state';

export const INITIAL_STATE: GameState = {
  currentRound: {
    gremlin: null,
    selectedGameActionIds: [],
  },
  pastRounds: [],
  ui: {
    review: false,
    view: 'welcome',
  },
  log: [],
};
