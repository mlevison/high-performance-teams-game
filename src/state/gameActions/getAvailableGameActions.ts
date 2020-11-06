import { GameAction } from './types';
import { GameActionId, gameActions } from './gameActions';

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
