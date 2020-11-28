import { sumByProp, storySucceeds } from '../lib';
import { GameActionId, GremlinId } from '../config';
import { GameState, getCapacity, getAllEffects } from './game';
import {
  findGameActionById,
  getCost as getActionCost,
  getEffects,
} from './gameActions';
import { Effect, isUserStoryChanceEffect } from './effects';

export type Round = {
  gremlin: GremlinId | null;
  selectedGameActionIds: GameActionId[];
};
export type ClosedRound = Round & {
  storiesCompleted: number;
};

export function createRound(gremlin: GremlinId | null): Round {
  return {
    gremlin,
    selectedGameActionIds: [],
  };
}

export function getActionEffects(
  round: ClosedRound,
  age: number,
  finishedActionIds: GameActionId[],
): Effect[] {
  const effects: Effect[] = [];
  round.selectedGameActionIds.forEach((id) => {
    effects.push(...getEffects(id, age, finishedActionIds));
  });
  return effects;
}

export function getCosts(round: Round) {
  return sumByProp(
    round.selectedGameActionIds.map((id) => ({
      cost: getActionCost(findGameActionById(id)),
    })),
    'cost',
  );
}

export function closeRound(state: GameState): ClosedRound {
  const effects = getAllEffects(state);
  const storiesAttempted = getCapacity(effects) - getCosts(state.currentRound);

  const chance = sumByProp(
    effects.filter(isUserStoryChanceEffect),
    'userStoryChance',
  );

  return {
    ...state.currentRound,
    storiesCompleted:
      storiesAttempted <= 0
        ? 0
        : Array.from({ length: storiesAttempted }).filter(() =>
            storySucceeds(chance),
          ).length,
  };
}
