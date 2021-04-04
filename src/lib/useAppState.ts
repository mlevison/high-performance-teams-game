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
import { createInitialState } from './initialState';

export type GameDispatch<GameActionId extends string = string> = Dispatch<
  Action<GameActionId>
>;

export function useAppState<GameActionId extends string>(
  config: GameConfig<GameActionId>,
  initialState: GameState<GameActionId>,
): [
  AppState<GameActionId>,
  () => ClosedRound<GameActionId>,
  () => string | null,
  string,
  GameDispatch<GameActionId>,
] {
  const gameReducer = useMemo(
    () => createGameReducer(config, createInitialState()),
    [config],
  );
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  usePersistState(gameState);
  const link = useStateLink(gameState);

  const state: GameState<GameActionId> =
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
