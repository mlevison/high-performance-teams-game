import { GameState } from './types';

export const INITIAL_STATE: GameState = {
  selectedGameActions: [],
  round: 1,
  capacity: 10,
  actionCostThisRound: 0,
  // storiesCompletedThisRound: 0,
  storiesCompleted: 0,
};
