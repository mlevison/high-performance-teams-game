import { Dispatch, useReducer } from 'react';
import { concatByProp, usePersistState, useStateLink } from '../lib';
import { Action, gameReducer, GameState } from './game';
import { getAvailableGameActions } from './gameActions';
import { GameActionWithStatus } from './gameActions/getAvailableGameActions';
import { rollGremlin } from './gremlins';
import { AppRound, ClosedGameRound, closeRound, deriveAppRound } from './round';
import { GremlinId } from '../config';

type PastRound = AppRound & {
  storiesCompleted: number;
};

export type AppState = {
  availableGameActions: GameActionWithStatus[];
  currentRound: AppRound;
  pastRounds: PastRound[];
  link: string;
  ui: GameState['ui'];
};

export default function useAppState(
  initialState: GameState,
): [AppState, Dispatch<Action>, () => ClosedGameRound, () => GremlinId | null] {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  usePersistState(gameState);
  const link = useStateLink(gameState);

  const state: GameState =
    gameState.ui.review === false
      ? gameState
      : {
          currentRound: gameState.pastRounds[gameState.ui.review],
          pastRounds: gameState.pastRounds.slice(0, gameState.ui.review),
          ui: {
            ...gameState.ui,
            closedRound: gameState.pastRounds[gameState.ui.review],
          },
        };

  const availableGameActions = getAvailableGameActions(
    state.pastRounds.length + 1,
    concatByProp(state.pastRounds, 'selectedGameActionIds'),
    state.currentRound.selectedGameActionIds,
  );

  return [
    {
      availableGameActions,
      currentRound: deriveAppRound(state),
      pastRounds: state.pastRounds.map((round, i) => {
        const pastRounds = state.pastRounds.slice(0, i);
        const currentRound = state.pastRounds[i];

        return {
          ...deriveAppRound({
            pastRounds,
            currentRound,
          }),
          storiesCompleted: round.storiesCompleted,
        };
      }),
      link,
      ui: state.ui,
    },
    dispatch,
    () => closeRound(state),
    () => rollGremlin(state),
  ];
}
