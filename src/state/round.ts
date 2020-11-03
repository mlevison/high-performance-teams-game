import { storySucceeds, sumByProp } from '../lib';
import { findGameActionById, GameActionId, getEffect } from './gameActions';
import { GremlinId } from './gremlins';

export type Round = {
  selectedGameActionIds: GameActionId[];
};
export type ClosedRound = Round & {
  storiesCompleted: number;
  gremlin?: GremlinId;
};

export function createRound(): Round {
  return {
    selectedGameActionIds: [],
  };
}

export function getEffects(
  round: Round,
  age: number,
  finishedActionIds: GameActionId[],
) {
  return round.selectedGameActionIds.map((id) =>
    getEffect(id, age, finishedActionIds),
  );
}

export function getCosts(round: Round) {
  return sumByProp(round.selectedGameActionIds.map(findGameActionById), 'cost');
}

export function closeRound(
  round: Round,
  storiesAttempted: number,
  gremlin?: GremlinId,
): ClosedRound {
  return {
    ...round,
    gremlin,
    storiesCompleted:
      storiesAttempted <= 0
        ? 0
        : Array(storiesAttempted).fill('').filter(storySucceeds).length,
  };
}
