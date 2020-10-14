import { storySucceeds } from '../lib';
import { GameState, GameAction, Action } from './types';

function sumUpEffects(gameActions: GameAction[]): number {
  let totalEffects = 0;

  gameActions.forEach(({ effect }) => {
    totalEffects += effect;
  });

  return totalEffects;
}

function sumUpCosts(gameActions: GameAction[]): number {
  let totalCosts = 0;

  gameActions.forEach(({ cost }) => {
    totalCosts += cost;
  });

  return totalCosts;
}

export default function gameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case 'ADD_GAME_ACTION':
      return {
        ...state,
        selectedGameActions: [...state.selectedGameActions, action.payload],
      };
    case 'NEXT_ROUND':
      return {
        ...state,
        actionCostThisRound: sumUpCosts(state.selectedGameActions),
        // storiesCompletedThisRound: capacity - state.actionCostThisRound,
        capacity: state.capacity + sumUpEffects(state.selectedGameActions),

        selectedGameActions: [],
        round: state.round + 1,
        storiesCompleted:
          state.storiesCompleted +
          Array(10).fill('').filter(storySucceeds).length,
      };
  }
}
