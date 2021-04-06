import { GameAction } from './types';

export function getCost<GameActionId extends string>(
  gameAction: GameAction<GameActionId>,
): number {
  return gameAction.cost;
}
