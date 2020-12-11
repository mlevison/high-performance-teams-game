import { Round, ClosedRound, createRound, getActionEffects } from './round';
import {
  Effect,
  isCapacityEffect,
  isEffect,
  isUserStoryOrGremlinChanceEffect,
} from './effects';
import { concatByProp } from '../lib';
import { GameActionId, gameEffects, GremlinId } from '../config';
import { getRoundEffects } from './rounds';
import { getEffects } from './gameActions';
import { getGremlinEffects } from './gremlins';

export type GameState = {
  currentRound: Round;
  pastRounds: ClosedRound[];
  ui: {
    view: 'welcome' | 'actions' | 'results';
    closedRound?: ClosedRound;
  };
};
export type RestartGameAction = {
  type: 'RESTART_GAME';
};
export type SelectGameActionAction = {
  type: 'SELECT_GAME_ACTION';
  payload: GameActionId;
};
export type SetUiViewAction = {
  type: 'SET_UI_VIEW_ACTION';
  payload: GameState['ui']['view'];
};
export type SetUiClosedRoundAction = {
  type: 'SET_UI_CLOSED_ROUND_ACTION';
  payload: ClosedRound;
};
export type UnselectGameActionAction = {
  type: 'UNSELECT_GAME_ACTION';
  payload: GameActionId;
};
export type NextRoundAction = {
  type: 'NEXT_ROUND';
  payload: {
    closedRound: ClosedRound;
    gremlin: GremlinId | null;
  };
};
export type Action =
  | NextRoundAction
  | SelectGameActionAction
  | UnselectGameActionAction
  | RestartGameAction
  | SetUiViewAction
  | SetUiClosedRoundAction;

export const INITIAL_STATE: GameState = {
  currentRound: {
    gremlin: null,
    selectedGameActionIds: [],
  },
  pastRounds: [],
  ui: {
    view: 'welcome',
  },
};

export function getAllEffects(
  state: Omit<GameState, 'ui'>,
  finishedActionIds: GameActionId[] = concatByProp(
    state.pastRounds,
    'selectedGameActionIds',
  ),
) {
  const effects: Effect[] = [];

  /* Base round effects of past rounds */
  effects.push(...getRoundEffects(state));

  /* UserStory and gremlin-roll effects are directly active */
  state.currentRound.selectedGameActionIds.forEach((id) => {
    effects.push(
      ...getEffects(id, 0, finishedActionIds).filter(
        isUserStoryOrGremlinChanceEffect,
      ),
    );
  });

  /* current rounds gremlin */
  effects.push(...getGremlinEffects(state.currentRound, 0, finishedActionIds));

  /* Get action and gremlin effects from past rounds */
  const roundAmounts = state.pastRounds.length;
  state.pastRounds.forEach((round, i) => {
    const age = roundAmounts - i;

    effects.push(
      /* gremlins occur on current round, so they're at age +1 in next */
      ...getGremlinEffects(round, age, finishedActionIds),
      /* actions get active in next */
      ...getActionEffects(round, age, finishedActionIds).filter(isEffect),
    );
  });

  /* Add game Effects */
  Object.values(gameEffects).forEach((gameEffect) => {
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
  return effects.filter(isCapacityEffect).reduce((capacity, effect) => {
    return capacity + effect.capacityChange;
  }, 0);
}

export function gameReducer(state: GameState, action: Action): GameState {
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
      };
    }
    case 'NEXT_ROUND': {
      return {
        ...state,
        ui: {
          view: 'welcome',
        },
        pastRounds: [...state.pastRounds, action.payload.closedRound],
        currentRound: createRound(action.payload.gremlin),
      };
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
          view: 'results',
          closedRound: action.payload,
        },
      };
    case 'RESTART_GAME':
      return INITIAL_STATE;
  }
}
