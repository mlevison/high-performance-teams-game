import fs from 'fs';
import progress from 'cli-progress';
import { config as originalConfig, GameActionId, GremlinId } from '../config';
import { simulateConfig } from './simulateConfig';
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
  GameAction,
} from '../state';

const config: typeof originalConfig = {
  ...originalConfig,
  ...simulateConfig,
  initialScores: {
    ...originalConfig.initialScores,
    ...simulateConfig.initialScores,
  },
};

type ActionSelector = (
  selectableGameActions: GameAction<GameActionId>[],
  round: AppRound<GameActionId>,
  state: GameState<GameActionId>,
) => GameAction<GameActionId> | null;

const actionSelectors: {
  [Key: string]: ActionSelector;
} = {
  /**
   * Select 3 random actions each round when possible
   */
  always3(selectableGameActions, round) {
    if (round.selectedGameActions.length < 3 && selectableGameActions.length) {
      return selectableGameActions[
        Math.floor(Math.random() * selectableGameActions.length)
      ];
    }

    return null;
  },
  /**
   * Select actions when possible and move to next round with
   * the same chance of selecting a single action
   */
  greedy(selectableGameActions, round) {
    return (
      selectableGameActions[
        Math.floor(Math.random() * (selectableGameActions.length + 1))
      ] || null
    );
  },
  /**
   * Always spend 30% of capacity on improvements
   */
  byPercent(selectableGameActions, round) {
    const targetPercent = 0.3;
    const targetPointsForActions = Math.round(
      round.capacity.total * targetPercent,
    );
    const spendOnActions = round.capacity.total - round.capacity.available;
    const availableForActions = targetPointsForActions - spendOnActions;

    const potentialActions = selectableGameActions.filter(
      ({ cost }) => cost <= availableForActions,
    );

    if (!potentialActions.length) {
      return null;
    }

    return potentialActions[
      Math.floor(Math.random() * potentialActions.length)
    ];
  },
  /**
   * 30% chance to to to next round with each decision
   */
  byChance(selectableGameActions) {
    if (Math.random() > 0.35 && selectableGameActions.length) {
      return selectableGameActions[
        Math.floor(Math.random() * selectableGameActions.length)
      ];
    }
    return null;
  },
};

const selectGameAction = actionSelectors.byChance;

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

    const selectableGameActions = getAvailableGameActions(
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
      .map(({ gameAction }) => gameAction);

    const action = selectGameAction(selectableGameActions, round, state);

    state = action
      ? reducer(state, { type: 'SELECT_GAME_ACTION', payload: action.id })
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
  simulateConfig,
  data: sims.map(({ final }) => final),
};

export type Results = typeof results;

fs.writeFileSync(__dirname + '/results.json', JSON.stringify(results));

console.log(
  '\nDone!\n\nTo inspect results start the dev-server with\n  npm start\n\nand open\n  http://localhost:3000/results',
);
