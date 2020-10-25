import { GameAction } from './types';
import { GameActionId, gameActionList } from './gameActions';

const gameActions: GameAction[] = Object.entries(
  gameActionList,
).map(([id, action]) => ({ ...action, id: id as GameActionId }));

export function findGameActionById(gameActionId: GameActionId): GameAction {
  return gameActions.find((gameAction) => gameActionId === gameAction.id)!;
}

export function getEffect(
  gameActionId: GameActionId,
  age: number,
  finishedActionIds: GameActionId[],
) {
  return findGameActionById(gameActionId).effect(age, finishedActionIds);
}

export function getAvailableGameActions(
  currentRound: number,
  finishedActionIds: GameActionId[],
  selectedGameActionIds: GameActionId[],
): GameAction[] {
  return gameActions.filter((gameAction) =>
    gameAction.available(
      currentRound,
      finishedActionIds,
      selectedGameActionIds,
      gameAction.id,
    ),
  );
}
