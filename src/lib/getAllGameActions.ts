import memoizeOne from 'memoize-one';
import { GameConfig, GameAction } from '../state/game';

export const getAllGameActions = memoizeOne(
  <GameActionId extends string, GremlinId extends string>(
    rounds: GameConfig<GameActionId, GremlinId>['rounds'],
  ): GameAction<GameActionId>[] => {
    return rounds
      .map((round, i) => {
        return Object.entries(round.actions).map(([actionId, action]) => ({
          ...action,
          round: i + 1,
          id: actionId as GameActionId,
        }));
      })
      .flat();
  },
);
