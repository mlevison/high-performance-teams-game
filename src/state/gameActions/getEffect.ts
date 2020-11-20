import { GameActionId } from '../../config';
import { Effect } from '../effects';
import { findGameActionById } from './findGameActionById';

export function getEffect(
  gameActionId: GameActionId,
  age: number,
  finishedActionIds: GameActionId[],
): Effect | null {
  const gameAction = findGameActionById(gameActionId);
  const effect = gameAction.effect?.(age, finishedActionIds) || null;
  if (effect === null) {
    return null;
  }

  const fallbackTitle: Effect['title'] = `${gameAction.name} active`;

  return {
    title: fallbackTitle,
    ...effect,
  } as Effect;
}
