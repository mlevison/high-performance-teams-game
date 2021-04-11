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
import { uiStateReducer, UIState, UiAction } from './uiState';

export type AppBaseState<
  GameActionId extends string = string,
  GremlinId extends string = string
> = GameState<GameActionId, GremlinId> & {
  ui: UIState<GameActionId, GremlinId>;
};

export type GameDispatch<
  GameActionId extends string = string,
  GremlinId extends string = string
> = Dispatch<
  Action<GameActionId, GremlinId> | UiAction<GameActionId, GremlinId>
>;

export function useAppState<
  GameActionId extends string,
  GremlinId extends string
>(
  config: GameConfig<GameActionId, GremlinId>,
  initialState: AppBaseState<GameActionId, GremlinId>,
): [
  AppState<GameActionId, GremlinId>,
  () => ClosedRound<GameActionId, GremlinId>,
  () => GremlinId | null,
  string,
  GameDispatch<GameActionId, GremlinId>,
] {
  const appReducer = useMemo(() => {
    const gameReducer = createGameReducer(config, createInitialState());

    return (
      state: AppBaseState<GameActionId, GremlinId>,
      action:
        | UiAction<GameActionId, GremlinId>
        | Action<GameActionId, GremlinId>,
    ): AppBaseState<GameActionId, GremlinId> => {
      /* We're deliberately passing unknown actions to the reducers knowing
         that they'll return undefined for them which means nothing happened */
      const ui = uiStateReducer(state.ui, action as any) || state.ui;
      const game = gameReducer(state, action as any) || state;

      return ui !== state.ui ? { ...game, ui } : Object.assign(game, { ui });
    };
  }, [config]);
  const [gameState, dispatch] = useReducer(appReducer, initialState);
  usePersistState(gameState);
  const link = useStateLink(gameState);

  const state: AppBaseState<GameActionId, GremlinId> =
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
