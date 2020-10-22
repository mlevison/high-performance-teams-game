import { Round, ClosedRound } from './round';
import { roundReducer, RoundAction, closeRound } from './round';

export type GameState = {
  currentRound: Round;
  pastRounds: ClosedRound[];
  capacity: number;
};

export type GameNextRoundAction = { type: 'GAME_NEXT_ROUND' };
export type Action = GameNextRoundAction | RoundAction;

export function gameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case 'ROUND_ADD_GAME_ACTION': {
      return {
        ...state,
        currentRound: roundReducer(state.currentRound, action),
      };
    }
    case 'GAME_NEXT_ROUND': {
      const currentRound = closeRound(state.currentRound, state.capacity);
      return {
        ...state,
        capacity: state.capacity + currentRound.effects,
        pastRounds: [...state.pastRounds, currentRound],
        currentRound: { selectedGameActions: [] },
      };
    }
  }
}
