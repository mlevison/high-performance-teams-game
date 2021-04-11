import fs from 'fs';
import progress from 'cli-progress';
import { config, GameActionId, GremlinId } from '../config';
import { createInitialState, concatByProp, sumByProp } from '../lib';
import {
  AppRound,
  createGameReducer,
  closeRound,
  deriveAppRound,
  deriveAppState,
  getAvailableGameActions,
  rollGremlin,
  GameState,
} from '../state';

/**
 * Return a whole number describing the amount of "go to next round"-Actions
 * that will be mixed with the actual actions selectable
 */
function restForFeaturesChance<GameActionId extends string>(
  selectableGameActionIds: GameActionId[],
  round: AppRound<GameActionId>,
  state: GameState<GameActionId>,
) {
  return 1;
}

/**
 * Select 3 random actions each round when possible
 */
function select3<GameActionId extends string>(
  selectableGameActionIds: GameActionId[],
  round: AppRound<GameActionId>,
  state: GameState<GameActionId>,
): GameActionId | null {
  if (round.selectedGameActions.length < 3 && selectableGameActionIds.length) {
    return selectableGameActionIds[
      Math.floor(Math.random() * selectableGameActionIds.length)
    ];
  }

  return null;
}

/**
 * Select actions when possible and move to next round with
 * the same chance of selecting a single action
 */
function greedySelect<GameActionId extends string>(
  selectableGameActionIds: GameActionId[],
  round: AppRound<GameActionId>,
  state: GameState<GameActionId>,
): GameActionId | null {
  const amountOfOptions =
    selectableGameActionIds.length +
    restForFeaturesChance(selectableGameActionIds, round, state);

  return (
    selectableGameActionIds[Math.floor(Math.random() * amountOfOptions)] || null
  );
}

const selectGameAction = select3;

const simulationsInput = parseInt(process.argv[2], 10);
const simulationsToRun: number =
  !isNaN(simulationsInput) && String(simulationsInput) === process.argv[2]
    ? simulationsInput
    : 100;

console.log(
  `Simulating ${simulationsToRun} game${simulationsToRun > 1 ? 's' : ''}...\n`,
);
const bar = new progress.SingleBar({}, progress.Presets.shades_classic);
bar.start(simulationsToRun, 0);

const sims: {
  state: GameState<GameActionId, GremlinId>;
  finished: number;
  final: [
    capacity: number,
    gremlinChance: number,
    userStoryChance: number,
    selectedActions: number,
    ocurredGremlins: number,
    storiesAttempted: number,
    storiesCompleted: number,
  ];
}[] = [];

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

    const action = selectGameAction(selectableGameActionIds, round, state);

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

  const [appState] = deriveAppState(
    { ...state, ui: { review: false, view: 'welcome' } },
    config,
  );

  const storiesAttempted = sumByProp(
    appState.pastRounds.map((round) => ({
      storiesAttempted: round.capacity.available,
    })),
    'storiesAttempted',
  );
  const storiesCompleted = sumByProp(appState.pastRounds, 'storiesCompleted');

  sims.push({
    state,
    finished: new Date().getTime(),
    final: [
      appState.currentRound.capacity.total,
      appState.currentRound.gremlinChance,
      appState.currentRound.userStoryChance,
      state.pastRounds.reduce(
        (i, { selectedGameActionIds }) => i + selectedGameActionIds.length,
        0,
      ),
      state.pastRounds.filter(({ gremlin }) => gremlin !== null).length,
      storiesAttempted,
      storiesCompleted,
    ],
  });
  bar.update(index + 1);
}

bar.stop();

/* Find Top and Flop games */
const topFlop: [value: number, id: number][] = [];
sims.forEach(({ final }, id) => {
  final.forEach((val, i) => {
    const t = i * 2;
    const f = t + 1;
    if (!topFlop[t] || topFlop[t][0] < val) {
      topFlop[t] = [val, id];
    }

    if (!topFlop[f] || topFlop[f][0] > val) {
      topFlop[f] = [val, id];
    }
  });
});
const relevantGameIndexes = Array.from(new Set(topFlop.map(([_, i]) => i)));

/* Create and wrote Results file */
const results = {
  relevantSims: Object.fromEntries(
    relevantGameIndexes.map((i) => [
      i,
      { state: sims[i].state, finished: sims[i].finished },
    ]),
  ),
  data: sims.map(({ final }) => final),
};

export type Results = typeof results;

fs.writeFileSync(__dirname + '/results.json', JSON.stringify(results));

console.log(
  '\nDone!\n\nTo inspect results start the dev-server with\n  npm start\n\nand open\n  http://localhost:3000/results',
);
