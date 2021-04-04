import { Effect } from '../effects';
import { findGameActionById } from '../../lib/findGameActionById';
import { GameConfig } from '../game';

export function getEffects<GameActionId extends string>(
  gameActionId: GameActionId,
  age: number,
  finishedActionIds: GameActionId[],
  rounds: GameConfig<GameActionId>['rounds'],
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
