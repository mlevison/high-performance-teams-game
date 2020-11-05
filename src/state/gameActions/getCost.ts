import { GameAction } from './types';

export function getCost(gameAction: GameAction): number {
  return gameAction.cost;
}
