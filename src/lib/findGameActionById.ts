import { getAllGameActions } from './getAllGameActions';
import type { GameAction, GameConfig } from '../state/game';

export function findGameActionById(
  gameActionId: string,
  rounds: GameConfig['rounds'],
): GameAction {
  const gameActions = getAllGameActions(rounds);

  const gameAction = gameActions.find(
    (gameAction) => gameActionId === gameAction.id,
  );

  if (!gameAction) {
    throw new Error(
      `Could not find GameAction with id ${gameActionId}. Are you sure it is registered?`,
    );
  }

  return gameAction;
}
