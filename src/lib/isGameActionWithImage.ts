import type { GameAction, GameActionWithImage } from '../state';

export function isGameActionWithImage<GameActionId extends string>(
  action: GameAction<GameActionId>,
): action is GameActionWithImage<GameActionId> {
  return Object.getOwnPropertyNames(action).includes('image');
}
