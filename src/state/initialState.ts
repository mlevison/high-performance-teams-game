import { GameState } from './game';

export const INITIAL_STATE: GameState = {
  currentRound: {
    selectedGameActions: [],
  },
  pastRounds: [],
  capacity: 10,
};
