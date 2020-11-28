import { GameActionId } from '../../config';
import { Effect } from '../effects';
import { findGameActionById } from './findGameActionById';

export function getEffects(
  gameActionId: GameActionId,
  age: number,
  finishedActionIds: GameActionId[],
): Effect[] {
  const gameAction = findGameActionById(gameActionId);
  const effect = gameAction.effect?.(age, finishedActionIds) || null;
  if (effect === null) {
    return [];
  }
  if (Array.isArray(effect)) {
    return effect;
  }

  const fallbackTitle: Effect['title'] = `${gameAction.name} active`;

  return [
    {
      title: fallbackTitle,
      ...effect,
    } as Effect,
  ];
}
