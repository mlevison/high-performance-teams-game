import { GameAction } from './types';
import { getAllGameActions } from '../../lib/getAllGameActions';
import { findGameActionById } from '../../lib/findGameActionById';
import { GameConfig } from '../game';

export const UNIQUE = Symbol('UNIQUE');

type Times = typeof UNIQUE | number;
type GameActionStatus = {
  dependencies: (GameAction & { missing: boolean })[];
} & (
  | { type: 'MISSING_DEP' }
  | { type: 'AVAILABLE'; times: Times }
  | { type: 'SELECTED'; times: Times }
  | { type: 'FINISHED' }
);

function getDependencies(gameAction: GameAction): string[] {
  const req = gameAction.available?.requires;
  if (!req) {
    return [];
  }
  if (!Array.isArray(req)) {
    return [req];
  }
  return req;
}

export type GameActionWithStatus = {
  gameAction: GameAction;
  status: GameActionStatus;
};

export function getAvailableGameActions(
  currentRoundIndex: number,
  finishedActionIds: string[],
  selectedGameActionIds: string[],
  rounds: GameConfig['rounds'],
): GameActionWithStatus[] {
  return getAllGameActions(rounds)
    .map((gameAction): GameActionWithStatus | null => {
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
    .filter((e): e is GameActionWithStatus => e !== null);
}
