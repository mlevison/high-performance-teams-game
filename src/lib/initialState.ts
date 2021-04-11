import type { AppBaseState } from './useAppState';

export function createInitialState<
  GameActionId extends string,
  GremlinId extends string
>(): AppBaseState<GameActionId, GremlinId> {
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
