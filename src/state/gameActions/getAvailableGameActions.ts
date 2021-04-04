import { GameAction } from './types';
import { getAllGameActions } from '../../lib/getAllGameActions';
import { findGameActionById } from '../../lib/findGameActionById';
import { GameConfig } from '../game';

export const UNIQUE = Symbol('UNIQUE');

type Times = typeof UNIQUE | number;
type GameActionStatus<GameActionId extends string> = {
  dependencies: (GameAction<GameActionId> & { missing: boolean })[];
} & (
  | { type: 'MISSING_DEP' }
  | { type: 'AVAILABLE'; times: Times }
  | { type: 'SELECTED'; times: Times }
  | { type: 'FINISHED' }
);

function getDependencies<GameActionId extends string>(
  gameAction: GameAction<GameActionId>,
): GameActionId[] {
  const req = gameAction.available?.requires;
  if (!req) {
    return [];
  }
  if (!Array.isArray(req)) {
    return [req];
  }
  return req;
}

export type GameActionWithStatus<GameActionId extends string = string> = {
  gameAction: GameAction<GameActionId>;
  status: GameActionStatus<GameActionId>;
};

export function getAvailableGameActions<GameActionId extends string>(
  currentRoundIndex: number,
  finishedActionIds: GameActionId[],
  selectedGameActionIds: GameActionId[],
  rounds: GameConfig<GameActionId>['rounds'],
): GameActionWithStatus<GameActionId>[] {
  return getAllGameActions(rounds)
    .map((gameAction): GameActionWithStatus<GameActionId> | null => {
      if (currentRoundIndex + 1 < gameAction.round) {
        return null;
      }

      const allDependencies = getDependencies(gameAction);
      const unmetDependencies = allDependencies.filter(
        (id) => !finishedActionIds.includes(id),
      );
      const dependencies = allDependencies
        .map((id) => findGameActionById(id, rounds))
        .map((gameAction) => ({
          ...gameAction,
          missing: unmetDependencies.includes(gameAction.id),
        }));

      if (unmetDependencies.length) {
        return {
          gameAction,
          status: {
            type: 'MISSING_DEP',
            dependencies,
          },
        };
      }

      const times =
        gameAction.available?.unique === false
          ? selectedGameActionIds.filter((id) => id === gameAction.id).length
          : UNIQUE;

      if (times === UNIQUE && finishedActionIds.includes(gameAction.id)) {
        return {
          gameAction,
          status: { type: 'FINISHED', dependencies },
        };
      }

      return {
        gameAction,
        status: selectedGameActionIds.includes(gameAction.id)
          ? {
              type: 'SELECTED',
              times,
              dependencies,
            }
          : { type: 'AVAILABLE', times, dependencies },
      };
    })
    .filter((e): e is GameActionWithStatus<GameActionId> => e !== null);
}
