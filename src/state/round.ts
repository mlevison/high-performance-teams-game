import { storySucceeds, sumByProp } from '../lib';
import { GameActionId } from '../config';
import { GameState, getCapacity, getAllRoundEffects } from './game';
import {
  findGameActionById,
  getCost as getActionCost,
  getEffect as getActionEffect,
} from './gameActions';
import { getGremlinEffect, GremlinId, rollGremlin } from './gremlins';

export type Round = {
  selectedGameActionIds: GameActionId[];
};
export type ClosedRound = Round & {
  storiesCompleted: number;
  gremlinRoll?: GremlinId;
};

export function createRound(): Round {
  return {
    selectedGameActionIds: [],
  };
}

export function getEffects(
  round: ClosedRound,
  age: number,
  finishedActionIds: GameActionId[],
  pastGremlinRolls: GremlinId[],
) {
  return round.selectedGameActionIds
    .map((id) => getActionEffect(id, age, finishedActionIds))
    .concat(
      round.gremlinRoll && !pastGremlinRolls.includes(round.gremlinRoll)
        ? getGremlinEffect(round.gremlinRoll, age, finishedActionIds)
        : [],
    );
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
  const storiesAttempted =
    getCapacity(getAllRoundEffects(state.pastRounds)) -
    getCosts(state.currentRound);

  return {
    ...state.currentRound,
    gremlinRoll: rollGremlin(state.pastRounds.length + 1),
    storiesCompleted:
      storiesAttempted <= 0
        ? 0
        : Array(storiesAttempted).fill('').filter(storySucceeds).length,
  };
}
