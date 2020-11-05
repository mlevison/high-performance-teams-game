import { GameActionId } from './gameActions';
import { findGameActionById } from './findGameActionById';

export function getEffect(
  gameActionId: GameActionId,
  age: number,
  finishedActionIds: GameActionId[],
) {
  return findGameActionById(gameActionId).effect(age, finishedActionIds);
}
