import { Round, ClosedRound, createRound, getEffects } from './round';
import { Effect, gameEffectList, isEffect } from './effects';
import { concatByProp } from '../lib';
import { getRoundDescriptionEffects } from './roundDescriptions';
import { GameActionId } from './gameActions';
import { isGremlinId } from './gremlins';

export const GAME_STATE = Symbol('GAME_STATE');

export type GameState = {
  currentRound: Round;
  pastRounds: ClosedRound[];
};
export type SelectGameActionAction = {
  type: 'SELECT_GAME_ACTION';
  payload: GameActionId;
};
export type UnselectGameActionAction = {
  type: 'UNSELECT_GAME_ACTION';
  payload: GameActionId;
};
export type NextRoundAction = {
  type: 'NEXT_ROUND';
  payload: ClosedRound;
};
export type Action =
  | NextRoundAction
  | SelectGameActionAction
  | UnselectGameActionAction;

export const INITIAL_STATE: GameState = {
  currentRound: {
    selectedGameActionIds: [],
  },
  pastRounds: [],
};

export function getRoundEffects(pastRounds: ClosedRound[]) {
  const roundAmounts = pastRounds.length;
  const roundDescriptionEffects = getRoundDescriptionEffects(pastRounds);
  if (!pastRounds.length) {
    return roundDescriptionEffects.filter(isEffect);
  }

  const allActionIds = concatByProp(pastRounds, 'selectedGameActionIds');

  const actionEffects = pastRounds.reduce((allEffects, round, i) => {
    const age = roundAmounts - (i + 1);
    const previousGremlinRolls = pastRounds
      .slice(0, i)
      .map((round) => round.gremlinRoll)
      .filter(isGremlinId);
    const roundEffects = getEffects(
      round,
      age,
      allActionIds,
      previousGremlinRolls,
    );

    return allEffects.concat(roundEffects);
  }, [] as (Effect | null)[]);

  const gameEffects = gameEffectList.map((gameEffect) => {
    return gameEffect(pastRounds);
  });

  return roundDescriptionEffects
    .concat(actionEffects)
    .concat(gameEffects)
    .filter(isEffect);
}

export function getCapacity(effects: Effect[]) {
  return effects.reduce((capacity, effect) => {
    return capacity + effect.capacity;
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
        pastRounds: [...state.pastRounds, action.payload],
        currentRound: createRound(),
      };
    }
  }
}
