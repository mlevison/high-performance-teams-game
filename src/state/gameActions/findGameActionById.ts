import { GameActionId } from '../../config';
import { GameAction } from './types';
import { gameActions } from './gameActions';

export function findGameActionById(gameActionId: GameActionId): GameAction {
  return gameActions.find((gameAction) => gameActionId === gameAction.id)!;
}
