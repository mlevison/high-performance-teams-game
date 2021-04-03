import { useMemo, useReducer, Dispatch } from 'react';
import type {
  GameConfig,
  GameState,
  AppState,
  Action,
  ClosedRound,
} from '../state';
import { createGameReducer, deriveAppState } from '../state';
import { usePersistState, useStateLink } from '../lib';

export type GameDispatch = Dispatch<Action>;

export function useAppState(
  initialState: GameState,
  config: GameConfig,
): [AppState, () => ClosedRound, () => string | null, string, GameDispatch] {
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

  return [...deriveAppState(state, config), link, dispatch];
}
