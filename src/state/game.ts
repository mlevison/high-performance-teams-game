import {
  Round,
  ClosedRound,
  createRound,
  closeRound,
  getEffects,
  getCosts,
} from './round';
import { concatByProp, sumByProp } from '../lib';
import { BASE_CAPACITY } from '../constants';
import { GameActionId } from './gameActions';

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

export function getRoundCapacity(pastRounds: Round[]) {
  const roundAmounts = pastRounds.length;
  const allActionIds = concatByProp(pastRounds, 'selectedGameActionIds');
  return pastRounds.reduce((capacity, round, i) => {
    const age = i + 1 - roundAmounts;
    const roundEffects = getEffects(round, age, allActionIds);

    return capacity + sumByProp(roundEffects, 'capacity');
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
            getRoundCapacity(state.pastRounds) - getCosts(state.currentRound),
          ),
        ],
        currentRound: createRound(),
      };
    }
  }
}
