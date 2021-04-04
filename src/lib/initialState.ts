import type { GameState } from '../state';

export function createInitialState<GameActionId extends string>(): GameState<
  GameActionId
> {
  return {
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
}
