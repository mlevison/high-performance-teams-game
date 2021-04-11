import progress from 'cli-progress';
import { config, GameActionId, GremlinId } from '../config';
import { createInitialState, concatByProp } from '../lib';
import {
  AppRound,
  createGameReducer,
  closeRound,
  deriveAppRound,
  getAvailableGameActions,
  rollGremlin,
  GameState,
} from '../state';

/**
 * Return a whole number describing the amount of "go to next round"-Actions
 * that will be mixed with the actual actions selectable
 */
function restForFeaturesChance<GameActionId extends string>(
  selectableGameActionIds: string[],
  round: AppRound<GameActionId>,
  state: GameState<GameActionId>,
) {
  return 1;
}

const simulationsInput = parseInt(process.argv[2], 10);
const simulationsToRun: number =
  !isNaN(simulationsInput) && String(simulationsInput) === process.argv[2]
    ? simulationsInput
    : 100;

const bar = new progress.SingleBar({}, progress.Presets.shades_classic);
bar.start(simulationsToRun, 0);

for (let index = 0; index < simulationsToRun; index++) {
  let state: GameState<GameActionId, GremlinId> = createInitialState();
  const reducer = createGameReducer(
    config,
    createInitialState<GameActionId, GremlinId>(),
  );

  while (
    state.pastRounds.length <
    config.rounds.length + config.trailingRounds
  ) {
    const round = deriveAppRound(state, config);

    const selectableGameActionIds = getAvailableGameActions(
      state.pastRounds.length,
      concatByProp(state.pastRounds, 'selectedGameActionIds'),
      state.currentRound.selectedGameActionIds,
      config.rounds,
    )
      .filter(
        ({ status, gameAction }) =>
          status.type === 'AVAILABLE' &&
          gameAction.cost <= round.capacity.available,
      )
      .map(({ gameAction }) => gameAction.id);

    const amountOfOptions =
      selectableGameActionIds.length +
      restForFeaturesChance(selectableGameActionIds, round, state);

    const action =
      selectableGameActionIds[Math.floor(Math.random() * amountOfOptions)];

    state = action
      ? reducer(state, { type: 'SELECT_GAME_ACTION', payload: action })
      : reducer(state, {
          type: 'NEXT_ROUND',
          payload: {
            closedRound: closeRound(state, config),
            gremlin: rollGremlin(state, config),
          },
        });
  }

  bar.update(index + 1);
}

bar.stop();
