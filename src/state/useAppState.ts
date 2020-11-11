import { Dispatch, ReactElement, useReducer } from 'react';
import { concatByProp, sumByProp } from '../lib';
import { isVisibleEffect, VisibleEffect } from './effects';
import {
  Action,
  gameReducer,
  getRoundEffects,
  getCapacity,
  INITIAL_STATE,
  GAME_STATE,
  GameState,
} from './game';
import { getAvailableGameActions, GameAction } from './gameActions';
import { getCosts } from './round';
import { roundDescriptions } from './roundDescriptions';

export type AppState = {
  [GAME_STATE]: GameState;
  availableGameActions: GameAction[];
  currentRound: {
    number: number;
    title?: string;
    description?: ReactElement;
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

export default function useAppState(): [AppState, Dispatch<Action>] {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const effects = getRoundEffects(state.pastRounds);
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
  const currentRoundTitle = roundDescriptions[currentRoundNumber]?.title;
  const currentRoundDescription =
    roundDescriptions[currentRoundNumber]?.description;

  return [
    {
      [GAME_STATE]: state,
      availableGameActions,
      currentRound: {
        title: currentRoundTitle,
        description: currentRoundDescription,
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
  ];
}
