import {
  sumByProp,
  storySucceeds,
  concatByProp,
  findGameActionById,
} from '../lib';
import { GameState, getCapacity, getAllEffects, GameConfig } from './game';
import { getCost as getActionCost, getEffects } from './gameActions';
import { Effect, isEffect, isVisibleEffect, VisibleEffect } from './effects';
import { getGremlin, GremlinDescription } from './gremlins';
import { ReactNode } from 'react';
import { GameAction } from './gameActions/types';

export type GameRound<GameActionId extends string, GremlinId extends string> = {
  gremlin: GremlinId | null;
  selectedGameActionIds: GameActionId[];
};
export type ClosedGameRound<
  GameActionId extends string = string,
  GremlinId extends string = string
> = GameRound<GameActionId, GremlinId> & {
  storiesCompleted: number;
};
export type AppRound<GameActionId extends string = string> = {
  number: number;
  title?: string;
  gremlin?: GremlinDescription & {
    effect: VisibleEffect[];
  };
  description?: ReactNode;
  selectedGameActions: GameAction<GameActionId>[];
  capacity: {
    available: number;
    total: number;
  };
  gremlinChance: number;
  userStoryChance: number;
  activeEffects: VisibleEffect[];
};

export function createRound<
  GameActionId extends string = string,
  GremlinId extends string = string
>(gremlin: GremlinId | null): GameRound<GameActionId, GremlinId> {
  return {
    gremlin,
    selectedGameActionIds: [],
  };
}

export function getActionEffects<
  GameActionId extends string,
  GremlinId extends string
>(
  round: ClosedGameRound<GameActionId, GremlinId>,
  age: number,
  finishedActionIds: GameActionId[],
  rounds: GameConfig<GameActionId, GremlinId>['rounds'],
): Effect[] {
  const effects: Effect[] = [];
  round.selectedGameActionIds.forEach((id) => {
    effects.push(...getEffects(id, age, finishedActionIds, rounds));
  });
  return effects;
}

export function getCosts<GameActionId extends string, GremlinId extends string>(
  round: GameRound<GameActionId, GremlinId>,
  rounds: GameConfig<GameActionId, GremlinId>['rounds'],
) {
  return sumByProp(
    round.selectedGameActionIds.map((id) => ({
      cost: getActionCost(findGameActionById(id, rounds)),
    })),
    'cost',
  );
}

export function closeRound<
  GameActionId extends string,
  GremlinId extends string
>(
  state: GameState<GameActionId, GremlinId>,
  config: GameConfig<GameActionId, GremlinId>,
): ClosedGameRound<GameActionId, GremlinId> {
  const effects = getAllEffects(state, config);
  const storiesAttempted =
    getCapacity(effects) - getCosts(state.currentRound, config.rounds);

  const chance = sumByProp(effects, 'userStoryChange');

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

export function deriveAppRound<
  GameActionId extends string,
  GremlinId extends string
>(
  state: Pick<
    GameState<GameActionId, GremlinId>,
    'currentRound' | 'pastRounds'
  >,
  config: GameConfig<GameActionId, GremlinId>,
): AppRound<GameActionId> {
  const finishedActionIds = concatByProp(
    state.pastRounds,
    'selectedGameActionIds',
  );
  const effects = getAllEffects(state, config, finishedActionIds);
  const roundCapacity = orZero(getCapacity(effects));
  const visibleEffects = effects.filter(isVisibleEffect);
  const totalUserStoryChance = sumByProp(effects, 'userStoryChange');
  const costs = getCosts(state.currentRound, config.rounds);
  const capacityAvailable = orZero(roundCapacity - costs);
  const currentRoundIndex = state.pastRounds.length;
  const selectedGameActions = state.currentRound.selectedGameActionIds.map(
    (id) => findGameActionById(id, config.rounds),
  );
  const currentRoundTitle = config.rounds[currentRoundIndex]?.title;
  const currentRoundDescription = config.rounds[currentRoundIndex]?.description;
  const gremlin = getGremlin(state.currentRound, config.gremlins);
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
    number: currentRoundIndex + 1,
    capacity: {
      available: capacityAvailable,
      total: roundCapacity,
    },
    gremlinChance: sumByProp(effects, 'gremlinChange'),
    userStoryChance: totalUserStoryChance,
    activeEffects: visibleEffects,
  };
}
