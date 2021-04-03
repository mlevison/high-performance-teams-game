import { concatByProp } from '../lib';
import { GameConfig, GameState } from './game';
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
  ui: GameState['ui'];
  log: GameState['log'];
};

export function deriveAppState(
  state: GameState,
  config: GameConfig,
): [AppState, () => ClosedGameRound, () => string | null] {
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
      ui: state.ui,
      log: state.log,
    },
    () => closeRound(state, config),
    () => rollGremlin(state, config),
  ];
}
