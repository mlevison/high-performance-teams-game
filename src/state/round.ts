import { storySucceeds, sumByProp } from '../lib';
import { GAME_STATE, getCapacity, getRoundEffects } from './game';
import {
  findGameActionById,
  GameActionId,
  getCost as getActionCost,
  getEffect as getActionEffect,
} from './gameActions';
import { getGremlinEffect, GremlinId, rollGremlin } from './gremlins';
import { AppState } from './useAppState';

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

export function getAttemptedStories(state: AppState) {
  const gameState = state[GAME_STATE];
  return (
    getCapacity(getRoundEffects(gameState.pastRounds)) -
    getCosts(gameState.currentRound)
  );
}

export function closeRound(state: AppState): ClosedRound {
  const gameState = state[GAME_STATE];
  const storiesAttempted = getAttemptedStories(state);

  return {
    ...gameState.currentRound,
    gremlinRoll: rollGremlin(state.currentRound.number),
    storiesCompleted:
      storiesAttempted <= 0
        ? 0
        : Array(storiesAttempted).fill('').filter(storySucceeds).length,
  };
}
