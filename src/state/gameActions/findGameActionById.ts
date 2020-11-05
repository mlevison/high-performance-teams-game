import { GameAction } from './types';
import { GameActionId, gameActions } from './gameActions';

export function findGameActionById(gameActionId: GameActionId): GameAction {
  return gameActions.find((gameAction) => gameActionId === gameAction.id)!;
}
