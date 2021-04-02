import { Effect } from '../effects';
import { findGameActionById } from '../../lib/findGameActionById';
import { GameConfig } from '../game';

export function getEffects(
  gameActionId: string,
  age: number,
  finishedActionIds: string[],
  rounds: GameConfig['rounds'],
): Effect[] {
  const gameAction = findGameActionById(gameActionId, rounds);
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
