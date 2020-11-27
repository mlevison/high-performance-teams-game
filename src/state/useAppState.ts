import { Dispatch, ReactNode, useReducer } from 'react';
import { concatByProp, sumByProp } from '../lib';
import {
  isVisibleEffect,
  VisibleEffect,
  BaseEffect,
  isEffect,
  isUserStoryChanceEffect,
} from './effects';
import {
  Action,
  gameReducer,
  getAllRoundEffects,
  getCapacity,
  INITIAL_STATE,
} from './game';
import {
  getAvailableGameActions,
  GameAction,
  findGameActionById,
  getEffect,
} from './gameActions';
import { GameActionWithStatus } from './gameActions/getAvailableGameActions';
import { GremlinDescription, getGremlin } from './gremlins';
import { ClosedRound, closeRound, getCosts } from './round';
import { rounds } from '../config';

export type AppState = {
  availableGameActions: GameActionWithStatus[];
  currentRound: {
    number: number;
    title?: string;
    gremlin?: GremlinDescription;
    description?: ReactNode;
    selectedGameActions: GameAction[];
    capacity: {
      available: number;
      total: number;
    };
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

export default function useAppState(): [
  AppState,
  Dispatch<Action>,
  () => ClosedRound,
] {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const effects = getAllRoundEffects(state.pastRounds);
  const roundCapacity = getCapacity(effects);

  const finishedActionIds = concatByProp(
    state.pastRounds,
    'selectedGameActionIds',
  );
  const thisRoundsActionUserStoryEffects = state.currentRound.selectedGameActionIds
    .map((id) => getEffect(id, 0, finishedActionIds))
    .filter(isEffect)
    .filter(isUserStoryChanceEffect);

  const visibleEffects = effects
    .concat(thisRoundsActionUserStoryEffects)
    .filter(isVisibleEffect);
  const totalUserStoryChance = sumByProp(
    effects
      .concat(thisRoundsActionUserStoryEffects)
      .filter(isUserStoryChanceEffect),
    'userStoryChance',
  );
  const costs = getCosts(state.currentRound);
  const capacityAvailable = roundCapacity - costs;
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
  const gremlin = getGremlin(state.pastRounds);

  return [
    {
      availableGameActions,
      currentRound: {
        selectedGameActions,
        title: currentRoundTitle,
        description: currentRoundDescription,
        gremlin,
        number: currentRoundNumber,
        capacity: {
          available: capacityAvailable,
          total: roundCapacity,
        },
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
  ];
}
