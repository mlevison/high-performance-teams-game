import { Round, ClosedRound, createRound, getEffects } from './round';
import { Effect, isCapacityEffect, isEffect } from './effects';
import { concatByProp } from '../lib';
import { GameActionId, gameEffects } from '../config';
import { getRoundEffects } from './rounds';
import { getGremlinRolls } from './gremlins';

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

export function getAllRoundEffects(pastRounds: ClosedRound[]) {
  const roundAmounts = pastRounds.length;
  const roundDescriptionEffects = getRoundEffects(pastRounds);
  if (!pastRounds.length) {
    return roundDescriptionEffects.filter(isEffect);
  }

  const allActionIds = concatByProp(pastRounds, 'selectedGameActionIds');

  const actionEffects = pastRounds.reduce((allEffects, round, i) => {
    const age = roundAmounts - (i + 1);
    const previousGremlinRolls = getGremlinRolls(pastRounds.slice(0, i));
    const roundEffects = getEffects(
      round,
      age,
      allActionIds,
      previousGremlinRolls,
    );

    return allEffects.concat(roundEffects);
  }, [] as (Effect | null)[]);

  const activeGameEffects = gameEffects.map((gameEffect) => {
    return gameEffect(pastRounds);
  });

  return roundDescriptionEffects
    .concat(actionEffects)
    .concat(activeGameEffects)
    .filter(isEffect);
}

export function getCapacity(effects: Effect[]) {
  return effects.filter(isCapacityEffect).reduce((capacity, effect) => {
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
