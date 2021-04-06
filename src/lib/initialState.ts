import type { GameState } from '../state';

export function createInitialState<
  GameActionId extends string,
  GremlinId extends string
>(): GameState<GameActionId, GremlinId> {
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
