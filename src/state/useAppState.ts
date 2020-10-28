import { Dispatch, useReducer } from 'react';
import { concatByProp, sumByProp } from '../lib';
import { Action, gameReducer, getRoundCapacity, INITIAL_STATE } from './game';
import { getAvailableGameActions, GameAction } from './gameActions';

import { getCosts } from './round';

type AppState = {
  availableGameActions: GameAction[];
  currentRound: {
    number: number;
    capacity: {
      available: number;
      total: number;
    };
  };
  result: {
    storiesCompleted: number;
  };
  pastRounds: {
    number: number;
  }[];
};

export default function useAppState(): [AppState, Dispatch<Action>] {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  // const pastRound = state.pastRounds[state.pastRounds.length - 1];
  const roundCapacity = getRoundCapacity(state.pastRounds);
  const costs = getCosts(state.currentRound);
  const capacityAvailable = roundCapacity - costs;
  const availableGameActions = getAvailableGameActions(
    state.pastRounds.length + 1,
    concatByProp(state.pastRounds, 'selectedGameActionIds'),
    state.currentRound.selectedGameActionIds,
  );

  return [
    {
      availableGameActions,
      currentRound: {
        number: state.pastRounds.length + 1,
        capacity: {
          available: capacityAvailable,
          total: roundCapacity,
        },
      },
      result: {
        storiesCompleted: sumByProp(state.pastRounds, 'storiesCompleted'),
      },
      pastRounds: state.pastRounds.map((round, i) => ({
        number: i + 1,
      })),
    },
    dispatch,
  ];
}
