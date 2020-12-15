import { sumByProp, storySucceeds, concatByProp } from '../lib';
import { GameActionId, GremlinId, rounds } from '../config';
import { GameState, getCapacity, getAllEffects } from './game';
import {
  findGameActionById,
  getCost as getActionCost,
  getEffects,
} from './gameActions';
import {
  BaseEffect,
  Effect,
  isEffect,
  isGremlinChanceEffect,
  isUserStoryChanceEffect,
  isVisibleEffect,
  VisibleEffect,
} from './effects';
import { getGremlin, GremlinDescription } from './gremlins';
import { ReactNode } from 'react';
import { GameAction } from './gameActions/types';

export type GameRound = {
  gremlin: GremlinId | null;
  selectedGameActionIds: GameActionId[];
};
export type ClosedGameRound = GameRound & {
  storiesCompleted: number;
};
export type AppRound = {
  number: number;
  title?: string;
  gremlin?: GremlinDescription & {
    effect: VisibleEffect<BaseEffect>[];
  };
  description?: ReactNode;
  selectedGameActions: GameAction[];
  capacity: {
    available: number;
    total: number;
  };
  gremlinChance: number;
  userStoryChance: number;
  activeEffects: VisibleEffect<BaseEffect>[];
};

export function createRound(gremlin: GremlinId | null): GameRound {
  return {
    gremlin,
    selectedGameActionIds: [],
  };
}

export function getActionEffects(
  round: ClosedGameRound,
  age: number,
  finishedActionIds: GameActionId[],
): Effect[] {
  const effects: Effect[] = [];
  round.selectedGameActionIds.forEach((id) => {
    effects.push(...getEffects(id, age, finishedActionIds));
  });
  return effects;
}

export function getCosts(round: GameRound) {
  return sumByProp(
    round.selectedGameActionIds.map((id) => ({
      cost: getActionCost(findGameActionById(id)),
    })),
    'cost',
  );
}

export function closeRound(state: GameState): ClosedGameRound {
  const effects = getAllEffects(state);
  const storiesAttempted = getCapacity(effects) - getCosts(state.currentRound);

  const chance = sumByProp(
    effects.filter(isUserStoryChanceEffect),
    'userStoryChange',
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

function orZero(num: number): number {
  return num < 0 ? 0 : num;
}

export function deriveAppRound(
  state: Pick<GameState, 'currentRound' | 'pastRounds'>,
): AppRound {
  const finishedActionIds = concatByProp(
    state.pastRounds,
    'selectedGameActionIds',
  );
  const effects = getAllEffects(state, finishedActionIds);
  const roundCapacity = orZero(getCapacity(effects));
  const visibleEffects = effects.filter(isVisibleEffect);
  const totalUserStoryChance = sumByProp(
    effects.filter(isUserStoryChanceEffect),
    'userStoryChange',
  );
  const costs = getCosts(state.currentRound);
  const capacityAvailable = orZero(roundCapacity - costs);
  const currentRoundNumber = state.pastRounds.length + 1;
  const selectedGameActions = state.currentRound.selectedGameActionIds.map(
    findGameActionById,
  );
  const currentRoundTitle = rounds[currentRoundNumber]?.title;
  const currentRoundDescription = rounds[currentRoundNumber]?.description;
  const gremlin = getGremlin(state.currentRound);
  const gremlinEffect = gremlin?.effect(0, finishedActionIds) || null;
  const visibleGremlinEffects = (Array.isArray(gremlinEffect)
    ? gremlinEffect
    : [gremlinEffect]
  )
    .filter(isEffect)
    .filter(isVisibleEffect);

  return {
    selectedGameActions,
    title: currentRoundTitle,
    description: currentRoundDescription,
    gremlin: gremlin
      ? {
          name: gremlin.name,
          description: gremlin.description,
          effect: visibleGremlinEffects,
        }
      : undefined,
    number: currentRoundNumber,
    capacity: {
      available: capacityAvailable,
      total: roundCapacity,
    },
    gremlinChance: sumByProp(
      effects.filter(isGremlinChanceEffect),
      'gremlinChange',
    ),
    userStoryChance: totalUserStoryChance,
    activeEffects: visibleEffects,
  };
}
