import {
  Round,
  ClosedRound,
  createRound,
  closeRound,
  getEffects,
  getCosts,
} from './round';
import { Effect, gameEffectList } from './effects';
import { concatByProp, sumByProp } from '../lib';
import { BASE_CAPACITY } from '../constants';
import { findGameActionById, GameActionId } from './gameActions';

export type GameState = {
  currentRound: Round;
  pastRounds: ClosedRound[];
};
export type SelectGameActionAction = {
  type: 'SELECT_GAME_ACTION';
  payload: GameActionId;
};
export type NextRoundAction = { type: 'NEXT_ROUND' };
export type Action = NextRoundAction | SelectGameActionAction;

export const INITIAL_STATE: GameState = {
  currentRound: {
    selectedGameActionIds: [],
  },
  pastRounds: [],
};

export function getAllSelectedGameActions(rounds: Round[]) {
  return concatByProp(rounds, 'selectedGameActionIds').map(findGameActionById);
}

export function getRoundEffects(pastRounds: Round[]) {
  if (!pastRounds.length) {
    return [];
  }

  const roundAmounts = pastRounds.length;
  const allActionIds = concatByProp(pastRounds, 'selectedGameActionIds');
  const actionEffects = pastRounds.reduce((allEffects, round, i) => {
    const age = i + 1 - roundAmounts;
    const roundEffects = getEffects(round, age, allActionIds);

    return allEffects.concat(roundEffects);
  }, [] as Effect[]);

  const gameEffects = gameEffectList
    .map((gameEffect) => {
      return gameEffect(pastRounds);
    })
    .filter(
      (gameEffectOrNull): gameEffectOrNull is Effect =>
        gameEffectOrNull !== null,
    );
  return actionEffects.concat(gameEffects);
}

export function getCapacity(effects: Effect[]) {
  return effects.reduce((capacity, effect) => {
    return capacity + effect.capacity;
  }, BASE_CAPACITY);
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
    case 'NEXT_ROUND': {
      return {
        ...state,
        pastRounds: [
          ...state.pastRounds,
          closeRound(
            state.currentRound,
            getCapacity(getRoundEffects(state.pastRounds)) -
              getCosts(state.currentRound),
          ),
        ],
        currentRound: createRound(),
      };
    }
  }
}
