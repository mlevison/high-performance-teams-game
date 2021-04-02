import {
  GameRound,
  ClosedGameRound,
  createRound,
  closeRound,
  getActionEffects,
} from './round';
import { Effect, GameEffect, isEffect } from './effects';
import { concatByProp } from '../lib';
import { getRoundEffects } from './rounds';
import { getEffects } from './gameActions';
import { getGremlinEffects, GremlinList } from './gremlins';
import { RoundDescription } from './rounds/types';
export type { GameAction } from './gameActions';

export type GameState = {
  currentRound: GameRound;
  pastRounds: ClosedGameRound[];
  ui: {
    review: false | number;
    view: 'welcome' | 'actions' | 'results';
    closedRound?: ClosedGameRound;
  };
  log: RunningGameAction[];
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
export type SetUiClosedRoundAction = {
  type: 'SET_UI_CLOSED_ROUND_ACTION';
  payload: ClosedGameRound;
};
export type SelectGameActionAction = {
  type: 'SELECT_GAME_ACTION';
  payload: string;
};
export type UnselectGameActionAction = {
  type: 'UNSELECT_GAME_ACTION';
  payload: string;
};
export type NextRoundAction = {
  type: 'NEXT_ROUND';
  payload: {
    closedRound: ClosedGameRound;
    gremlin: string | null;
  };
};
export type FinishGameAction = {
  type: 'FINISH_GAME';
  payload: {
    closedRound: ClosedGameRound;
  };
};
export type GameActionAction =
  | SelectGameActionAction
  | UnselectGameActionAction;
type RunningGameAction = GameActionAction | NextRoundAction;
type UiAction = SetUiViewAction | SetUiClosedRoundAction | SetUiReviewAction;

export type Action =
  | RunningGameAction
  | RestartGameAction
  | FinishGameAction
  | UiAction;

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

export type GameConfig = {
  trailingRounds: number;
  rounds: RoundDescription[];
  gremlins: GremlinList;
  gameEffects: { [key: string]: GameEffect };
};

export function getAllEffects(
  state: Pick<GameState, 'currentRound' | 'pastRounds'>,
  config: GameConfig,
  finishedActionIds: string[] = concatByProp(
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

function nextRound(state: GameState, action: NextRoundAction): GameState {
  return {
    ...state,
    ui: {
      review: false,
      view: 'welcome',
    },
    pastRounds: [...state.pastRounds, action.payload.closedRound],
    currentRound: createRound(action.payload.gremlin),
    log: state.log.concat(action),
  };
}

export function createGameReducer(config: GameConfig) {
  return (state: GameState, action: Action): GameState => {
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
        }).reduce<[GameState, ClosedGameRound]>(
          ([state, closedRound]) => {
            const nextState = nextRound(state, {
              type: 'NEXT_ROUND',
              payload: {
                closedRound,
                gremlin: null,
              },
            });

            return [nextState, closeRound(nextState, config)];
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
        return INITIAL_STATE;
    }
  };
}
