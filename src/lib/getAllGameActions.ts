import memoizeOne from 'memoize-one';
import { GameConfig, GameAction } from '../state/game';

export const getAllGameActions = memoizeOne(
  (rounds: GameConfig['rounds']): GameAction[] => {
    return rounds
      .map((round, i) => {
        return Object.entries(round.actions).map(([actionId, action]) => ({
          ...action,
          round: i + 1,
          id: actionId,
        }));
      })
      .flat();
  },
);
