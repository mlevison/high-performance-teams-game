import fs from 'fs';
import progress from 'cli-progress';
import { config as originalConfig, GameActionId, GremlinId } from '../config';
import {
  simulateConfig,
  actionSelector,
  calculateCombinedScore,
  STORE_BEST,
  STORE_WORST,
} from './simulateConfig';
import { createInitialState, concatByProp, sumByProp } from '../lib';
import {
  createGameReducer,
  closeRound,
  deriveAppRound,
  deriveAppState,
  getAvailableGameActions,
  rollGremlin,
  GameState,
} from '../state';

const config: typeof originalConfig = {
  ...originalConfig,
  ...simulateConfig,
  initialScores: {
    ...originalConfig.initialScores,
    ...simulateConfig.initialScores,
  },
};

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

const FINAL_KEYS = [
  'capacity' as const,
  'gremlinChance' as const,
  'userStoryChance' as const,
  'selectedActions' as const,
  'ocurredGremlins' as const,
  'storiesAttempted' as const,
  'storiesCompleted' as const,
  'combinedScore' as const,
];
type FinalKeys = typeof FINAL_KEYS;

type Simulation = {
  state: GameState<GameActionId, GremlinId>;
  finished: number;
  final: {
    [K in FinalKeys[0]]: number;
  };
};

export type SimulationWithoutCombinedScore = Omit<Simulation, 'final'> & {
  final: Omit<Simulation['final'], 'combinedScore'>;
};

const relevantSims: { [K: number]: Simulation } = {};
const data: number[][] = [];
const topFlop: {
  [K in FinalKeys[0]]: {
    top: number[];
    flop: number[];
  };
} = {
  capacity: { top: [], flop: [] },
  gremlinChance: { top: [], flop: [] },
  userStoryChance: { top: [], flop: [] },
  selectedActions: { top: [], flop: [] },
  ocurredGremlins: { top: [], flop: [] },
  storiesAttempted: { top: [], flop: [] },
  storiesCompleted: { top: [], flop: [] },
  combinedScore: { top: [], flop: [] },
};

const reducer = createGameReducer(
  config,
  createInitialState<GameActionId, GremlinId>(),
);

for (let index = 0; index < simulationsToRun; index++) {
  let state: GameState<GameActionId, GremlinId> = createInitialState();

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

    const action = actionSelector(selectableGameActions, round, state);

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

  const simWithoutCombined: SimulationWithoutCombinedScore = {
    state,
    finished: new Date().getTime(),
    final: {
      capacity: appState.currentRound.capacity.total,
      gremlinChance: appState.currentRound.gremlinChance,
      userStoryChance: appState.currentRound.userStoryChance,
      selectedActions: state.pastRounds.reduce(
        (i, { selectedGameActionIds }) => i + selectedGameActionIds.length,
        0,
      ),
      ocurredGremlins: state.pastRounds.filter(
        ({ gremlin }) => gremlin !== null,
      ).length,
      storiesAttempted: storiesAttempted,
      storiesCompleted: storiesCompleted,
    },
  };
  registerGame(
    {
      ...simWithoutCombined,
      final: {
        ...simWithoutCombined.final,
        combinedScore: calculateCombinedScore(simWithoutCombined),
      },
    },
    index,
  );
  bar.update(index + 1);
}

bar.stop();

function registerGame(sim: Simulation, i: number) {
  const outruled: number[] = [];
  data.push(Object.values(sim.final));
  FINAL_KEYS.forEach((key) => {
    relevantSims[i] = sim;

    topFlop[key].top.push(i);
    outruled.push(
      ...topFlop[key].top
        .sort((ia, ib) => {
          const {
            final: { [key]: a, combinedScore: ca },
          } = relevantSims[ia];
          const {
            final: { [key]: b, combinedScore: cb },
          } = relevantSims[ib];
          if (a !== b) {
            return b - a;
          } else if (cb !== ca) {
            return cb - ca;
          }
          return ib - ia;
        })
        .splice(0, topFlop[key].top.length - STORE_BEST),
    );
    topFlop[key].flop.push(i);
    outruled.push(
      ...topFlop[key].flop
        .sort((ia, ib) => {
          const {
            final: { [key]: a, combinedScore: ca },
          } = relevantSims[ia];
          const {
            final: { [key]: b, combinedScore: cb },
          } = relevantSims[ib];
          if (a !== b) {
            return a - b;
          } else if (cb !== ca) {
            return ca - cb;
          }
          return ia - ib;
        })
        .splice(0, topFlop[key].flop.length - STORE_WORST),
    );
  });
  Array.from(new Set(outruled)).forEach((out) => {
    const someoneLikesMe = FINAL_KEYS.some(
      (key) =>
        topFlop[key].top.includes(out) || topFlop[key].flop.includes(out),
    );
    if (!someoneLikesMe) {
      delete relevantSims[out];
    }
  });
}

/* Create and wrote Results file */
const results = {
  relevantSims,
  data,
  simulateConfig,
};

export type Results = typeof results;

fs.writeFileSync(__dirname + '/results.json', JSON.stringify(results));

console.log(
  '\nDone!\n\nTo inspect results start the dev-server with\n  npm start\n\nand open\n  http://localhost:3000/results',
);
