import type { GameAction, GameActionWithImage } from '../state';

export function isGameActionWithImage(
  action: GameAction,
): action is GameActionWithImage {
  return Object.getOwnPropertyNames(action).includes('image');
}
