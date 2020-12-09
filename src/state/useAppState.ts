import { Dispatch, ReactNode, useReducer } from 'react';
import { concatByProp, sumByProp } from '../lib';
import {
  isVisibleEffect,
  VisibleEffect,
  BaseEffect,
  isUserStoryChanceEffect,
  isGremlinChanceEffect,
  isEffect,
} from './effects';
import {
  Action,
  gameReducer,
  getAllEffects,
  getCapacity,
  INITIAL_STATE,
} from './game';
import {
  getAvailableGameActions,
  GameAction,
  findGameActionById,
} from './gameActions';
import { GameActionWithStatus } from './gameActions/getAvailableGameActions';
import { GremlinDescription, rollGremlin, getGremlin } from './gremlins';
import { ClosedRound, closeRound, getCosts } from './round';
import { GremlinId, rounds } from '../config';

export type AppState = {
  availableGameActions: GameActionWithStatus[];
  currentRound: {
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
  result: {
    storiesCompleted: number;
  };
  pastRounds: {
    // storiesSucceeded: number;
    number: number;
  }[];
};

function orZero(num: number): number {
  return num < 0 ? 0 : num;
}

export default function useAppState(): [
  AppState,
  Dispatch<Action>,
  () => ClosedRound,
  () => GremlinId | null,
] {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

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
  const availableGameActions = getAvailableGameActions(
    currentRoundNumber,
    concatByProp(state.pastRounds, 'selectedGameActionIds'),
    state.currentRound.selectedGameActionIds,
  );
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

  return [
    {
      availableGameActions,
      currentRound: {
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
      },
      result: {
        storiesCompleted: sumByProp(state.pastRounds, 'storiesCompleted'),
      },
      pastRounds: state.pastRounds.map((round, i) => ({
        number: i + 1,
      })),
    },
    dispatch,
    () => closeRound(state),
    () => rollGremlin(state),
  ];
}
