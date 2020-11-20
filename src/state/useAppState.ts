import { Dispatch, ReactNode, useReducer } from 'react';
import { concatByProp, sumByProp } from '../lib';
import { isVisibleEffect, VisibleEffect } from './effects';
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
    activeEffects: VisibleEffect[];
  };
  result: {
    storiesCompleted: number;
  };
  pastRounds: {
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
  const visibleEffects = effects.filter(isVisibleEffect);
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
