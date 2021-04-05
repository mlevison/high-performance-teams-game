import { concatByProp } from '../lib';
import {
  GameRound,
  ClosedGameRound,
  createRound,
  closeRound,
  getActionEffects,
} from './round';
import { Effect, GameEffect, isEffect } from './effects';
import { getRoundEffects } from './rounds';
import { getEffects } from './gameActions';
import { getGremlinEffects, GremlinList } from './gremlins';
import { RoundDescription } from './rounds/types';
export type { GameAction } from './gameActions';

export type GameState<
  GameActionId extends string = string,
  GremlinId extends string = string
> = {
  currentRound: GameRound<GameActionId, GremlinId>;
  pastRounds: ClosedGameRound<GameActionId, GremlinId>[];
  ui: {
    review: false | number;
    view: 'welcome' | 'actions' | 'results';
    closedRound?: ClosedGameRound<GameActionId, GremlinId>;
  };
  log: RunningGameAction<GameActionId, GremlinId>[];
};

export type RestartGameAction = {
  type: 'RESTART_GAME';
};
export type SetUiReviewAction = {
  type: 'SET_UI_REVIEW_ACTION';
  payload: GameState['ui']['review'];
};
export type SetUiViewAction = {
  type: 'SET_UI_VIEW_ACTION';
  payload: GameState['ui']['view'];
};
export type SetUiClosedRoundAction<
  GameActionId extends string,
  GremlinId extends string
> = {
  type: 'SET_UI_CLOSED_ROUND_ACTION';
  payload: ClosedGameRound<GameActionId, GremlinId>;
};
export type SelectGameActionAction<GameActionId extends string> = {
  type: 'SELECT_GAME_ACTION';
  payload: GameActionId;
};
export type UnselectGameActionAction<GameActionId extends string> = {
  type: 'UNSELECT_GAME_ACTION';
  payload: GameActionId;
};
export type NextRoundAction<
  GameActionId extends string,
  GremlinId extends string
> = {
  type: 'NEXT_ROUND';
  payload: {
    closedRound: ClosedGameRound<GameActionId, GremlinId>;
    gremlin: GremlinId | null;
  };
};
export type FinishGameAction<
  GameActionId extends string,
  GremlinId extends string
> = {
  type: 'FINISH_GAME';
  payload: {
    closedRound: ClosedGameRound<GameActionId, GremlinId>;
  };
};
export type GameActionAction<GameActionId extends string = string> =
  | SelectGameActionAction<GameActionId>
  | UnselectGameActionAction<GameActionId>;
type RunningGameAction<GameActionId extends string, GremlinId extends string> =
  | GameActionAction<GameActionId>
  | NextRoundAction<GameActionId, GremlinId>;
type UiAction<GameActionId extends string, GremlinId extends string> =
  | SetUiViewAction
  | SetUiClosedRoundAction<GameActionId, GremlinId>
  | SetUiReviewAction;

export type Action<GameActionId extends string, GremlinId extends string> =
  | RunningGameAction<GameActionId, GremlinId>
  | RestartGameAction
  | FinishGameAction<GameActionId, GremlinId>
  | UiAction<GameActionId, GremlinId>;

export type GameConfig<
  GameActionId extends string = string,
  GremlinId extends string = string
> = {
  trailingRounds: number;
  rounds: RoundDescription<string, GameActionId, GremlinId>[];
  gremlins: GremlinList<GremlinId, GameActionId>;
  gameEffects: { [key: string]: GameEffect<GameActionId, GremlinId> };
};

export function getAllEffects<
  GameActionId extends string,
  GremlinId extends string
>(
  state: Pick<
    GameState<GameActionId, GremlinId>,
    'currentRound' | 'pastRounds'
  >,
  config: GameConfig<GameActionId, GremlinId>,
  finishedActionIds: GameActionId[] = concatByProp(
    state.pastRounds,
    'selectedGameActionIds',
  ),
) {
  const effects: Effect[] = [];

  /* Base round effects of past rounds */
  effects.push(...getRoundEffects(state, config.rounds));

  /* Current rounds effects */
  state.currentRound.selectedGameActionIds.forEach((id) => {
    const currentRoundEffects = getEffects(
      id,
      0,
      finishedActionIds,
      config.rounds,
    );

    currentRoundEffects.forEach((effect) => {
      if (
        effect.userStoryChange !== undefined ||
        effect.gremlinChange !== undefined
      ) {
        /* Unset capacityChange because it only gets active in next round */
        effects.push({ ...effect, capacityChange: undefined });
      }
    });
  });

  /* current rounds gremlin */
  effects.push(
    ...getGremlinEffects(
      state.currentRound,
      0,
      finishedActionIds,
      config.gremlins,
    ),
  );

  /* Get action and gremlin effects from past rounds */
  const roundAmounts = state.pastRounds.length;
  state.pastRounds.forEach((round, i) => {
    const age = roundAmounts - i;

    effects.push(
      /* gremlins occur on current round, so they're at age +1 in next */
      ...getGremlinEffects(round, age, finishedActionIds, config.gremlins),
      /* actions get active in next */
      ...getActionEffects(round, age, finishedActionIds, config.rounds).filter(
        isEffect,
      ),
    );
  });

  /* Add game Effects */
  Object.values(config.gameEffects).forEach((gameEffect) => {
    const effect = gameEffect(state.pastRounds);
    if (Array.isArray(effect)) {
      effects.push(...effect);
    } else if (effect) {
      effects.push(effect);
    }
  });

  return effects;
}

export function getCapacity(effects: Effect[]) {
  return effects.reduce((capacity, effect) => {
    return capacity + (effect.capacityChange || 0);
  }, 0);
}

function nextRound<GameActionId extends string, GremlinId extends string>(
  state: GameState<GameActionId, GremlinId>,
  action: NextRoundAction<GameActionId, GremlinId>,
): GameState<GameActionId, GremlinId> {
  return {
    ...state,
    ui: {
      review: false,
      view: 'welcome',
    },
    pastRounds: [...state.pastRounds, action.payload.closedRound],
    currentRound: createRound<GameActionId, GremlinId>(action.payload.gremlin),
    log: state.log.concat(action),
  };
}

export function createGameReducer<
  GameActionId extends string,
  GremlinId extends string
>(
  config: GameConfig<GameActionId, GremlinId>,
  initialState: GameState<GameActionId, GremlinId>,
) {
  return (
    state: GameState<GameActionId, GremlinId>,
    action: Action<GameActionId, GremlinId>,
  ): GameState<GameActionId, GremlinId> => {
    switch (action.type) {
      case 'SELECT_GAME_ACTION': {
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            selectedGameActionIds: [
              ...state.currentRound.selectedGameActionIds,
              action.payload,
            ],
          },
          log: state.log.concat(action),
        };
      }
      case 'UNSELECT_GAME_ACTION': {
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            selectedGameActionIds: state.currentRound.selectedGameActionIds.filter(
              (id) => id !== action.payload,
            ),
          },
          log: state.log.concat(action),
        };
      }
      case 'NEXT_ROUND': {
        return nextRound(state, action);
      }
      case 'FINISH_GAME': {
        return Array.from({
          length:
            config.rounds.length +
            config.trailingRounds -
            state.pastRounds.length,
        }).reduce<
          [
            GameState<GameActionId, GremlinId>,
            ClosedGameRound<GameActionId, GremlinId>,
          ]
        >(
          ([state, closedRound]) => {
            const nextState = nextRound(state, {
              type: 'NEXT_ROUND',
              payload: {
                closedRound,
                gremlin: null,
              },
            });

            return [
              nextState,
              closeRound<GameActionId, GremlinId>(nextState, config),
            ];
          },
          [state, action.payload.closedRound],
        )[0];
      }
      case 'SET_UI_VIEW_ACTION':
        return {
          ...state,
          ui: {
            ...state.ui,
            view: action.payload,
          },
        };
      case 'SET_UI_CLOSED_ROUND_ACTION':
        return {
          ...state,
          ui: {
            ...state.ui,
            view: 'results',
            closedRound: action.payload,
          },
        };
      case 'SET_UI_REVIEW_ACTION':
        return {
          ...state,
          ui: {
            ...state.ui,
            view: 'welcome',
            review: action.payload,
          },
        };
      case 'RESTART_GAME':
        return initialState;
    }
  };
}
