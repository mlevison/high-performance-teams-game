import { GameActionId } from '../../config';
import { GameAction } from './types';
import { gameActions } from './gameActions';

export function findGameActionById(gameActionId: GameActionId): GameAction {
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
