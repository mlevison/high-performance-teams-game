import { storySucceeds, sumByProp } from '../lib';
import { GameAction } from './gameActions';

export type Round = {
  selectedGameActions: GameAction[];
};
export type ClosedRound = Round & {
  storiesAttempted: number;
  storiesCompleted: number;
  effects: number;
  costs: number;
};

export type RoundAddGameActionAction = {
  type: 'ROUND_ADD_GAME_ACTION';
  payload: GameAction;
};
export type RoundAction = RoundAddGameActionAction;

export function roundReducer(round: Round, action: RoundAction): Round {
  switch (action.type) {
    case 'ROUND_ADD_GAME_ACTION': {
      return {
        ...round,
        selectedGameActions: [...round.selectedGameActions, action.payload],
      };
    }
  }
}

export function closeRound(round: Round, totalCapacity: number): ClosedRound {
  const effects = sumByProp(round.selectedGameActions, 'effect');
  const costs = sumByProp(round.selectedGameActions, 'cost');
  const storiesAttempted = totalCapacity - costs;
  return {
    ...round,
    effects,
    costs,
    storiesAttempted,
    storiesCompleted: Array(storiesAttempted).fill('').filter(storySucceeds)
      .length,
  };
}
