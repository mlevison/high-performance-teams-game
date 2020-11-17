import { GameActionId } from './gameActions';
import { findGameActionById } from './findGameActionById';
import { Effect } from '../effects';

export function getEffect(
  gameActionId: GameActionId,
  age: number,
  finishedActionIds: GameActionId[],
): Effect | null {
  const gameAction = findGameActionById(gameActionId);
  const effect = gameAction.effect(age, finishedActionIds);
  if (effect === null) {
    return null;
  }

  return {
    title: `${gameAction.name} active`,
    ...effect,
  };
}
