import { Dispatch, useMemo, useReducer } from 'react';
import { concatByProp, usePersistState, useStateLink } from '../lib';
import { Action, createGameReducer, GameConfig, GameState } from './game';
import { getAvailableGameActions } from './gameActions';
import { GameActionWithStatus } from './gameActions/getAvailableGameActions';
import { rollGremlin } from './gremlins';
import { AppRound, ClosedGameRound, closeRound, deriveAppRound } from './round';

type PastRound = AppRound & {
  storiesCompleted: number;
};

export type AppState = {
  availableGameActions: GameActionWithStatus[];
  currentRound: AppRound;
  pastRounds: PastRound[];
  link: string;
  ui: GameState['ui'];
  log: GameState['log'];
};

export default function useAppState(
  initialState: GameState,
  config: GameConfig,
): [AppState, Dispatch<Action>, () => ClosedGameRound, () => string | null] {
  const gameReducer = useMemo(() => createGameReducer(config), [config]);
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
          log: gameState.log,
        };

  const availableGameActions = getAvailableGameActions(
    state.pastRounds.length,
    concatByProp(state.pastRounds, 'selectedGameActionIds'),
    state.currentRound.selectedGameActionIds,
    config.rounds,
  );

  return [
    {
      availableGameActions,
      currentRound: deriveAppRound(state, config),
      pastRounds: state.pastRounds.map((round, i) => {
        const pastRounds = state.pastRounds.slice(0, i);
        const currentRound = state.pastRounds[i];

        return {
          ...deriveAppRound(
            {
              pastRounds,
              currentRound,
            },
            config,
          ),
          storiesCompleted: round.storiesCompleted,
        };
      }),
      link,
      ui: state.ui,
      log: state.log,
    },
    dispatch,
    () => closeRound(state, config),
    () => rollGremlin(state, config),
  ];
}
