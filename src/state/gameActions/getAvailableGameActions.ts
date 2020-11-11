import { GameAction } from './types';
import { GameActionId, gameActions } from './gameActions';

type GameActionStatus =
  | { type: 'MISSING_DEP'; unmetDependencies: GameActionId[] }
  | { type: 'AVAILABLE' }
  | { type: 'SELECTED' }
  | { type: 'MULTI_SELECT'; times: number };

function normalizeRequires(
  req: GameAction['available']['requires'],
): GameActionId[] {
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
  currentRound: number,
  finishedActionIds: GameActionId[],
  selectedGameActionIds: GameActionId[],
): GameActionWithStatus[] {
  return gameActions
    .map((gameAction): GameActionWithStatus | null => {
      if (currentRound < gameAction.available.round) {
        return null;
      }

      const dependencies = normalizeRequires(gameAction.available.requires);
      const unmetDependencies = dependencies.filter(
        (id) => !finishedActionIds.includes(id),
      );

      if (unmetDependencies.length) {
        return {
          gameAction,
          status: { type: 'MISSING_DEP', unmetDependencies },
        };
      }

      if (gameAction.available.unique === false) {
        return {
          gameAction,
          status: {
            type: 'MULTI_SELECT',
            times: selectedGameActionIds.filter((id) => id === gameAction.id)
              .length,
          },
        };
      }

      return {
        gameAction,
        status: selectedGameActionIds.includes(gameAction.id)
          ? { type: 'SELECTED' }
          : { type: 'AVAILABLE' },
      };
    })
    .filter((e): e is GameActionWithStatus => e !== null);
}
