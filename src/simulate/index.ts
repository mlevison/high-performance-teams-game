import fs from 'fs';
import progress from 'cli-progress';
import { stringify } from 'csv-stringify/sync';
import { config as originalConfig, GameActionId, GremlinId } from '../config';
import {
  simulateConfig,
  actionSelector,
  scorings,
  createCSVFor,
  defaultSort,
  customSort,
  considerGame,
  STORE_BEST,
  INCLUDE_LINK,
  STORE_WORST,
} from './simulateConfig';
import { createInitialState, concatByProp, stateLink } from '../lib';
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
let simulationsToRun: number =
  !isNaN(simulationsInput) && String(simulationsInput) === process.argv[2]
    ? simulationsInput
    : 100;

if (simulationsToRun < STORE_BEST + STORE_WORST) {
  simulationsToRun = STORE_BEST + STORE_WORST;
  console.log(
    'WARNING: increased simulations to prevent duplicates in results',
  );
}

console.log(
  `Simulating ${simulationsToRun} game${simulationsToRun > 1 ? 's' : ''}...\n`,
);
const bar = new progress.SingleBar({}, progress.Presets.shades_classic);
bar.start(simulationsToRun, 0);

type FinalKeys = keyof typeof scorings;
const scoringKeys = Object.keys(scorings) as FinalKeys[];

type Simulation = {
  state: GameState<GameActionId, GremlinId>;
  finished: number;
  scores: Record<string, number>;
};

const relevantSims: { [K: number]: Simulation } = {};
const allScores: number[][] = [];
const bestGames: Record<string, number[]> = {};
const worstGames: Record<string, number[]> = {};
let maxSelectedActions = 0;

scoringKeys.forEach((key) => {
  bestGames[key] = [];
  worstGames[key] = [];
});

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

    if (action) {
      state = reducer(state, {
        type: 'SELECT_GAME_ACTION',
        payload: action.id,
      });
    } else {
      maxSelectedActions = Math.max(
        maxSelectedActions,
        state.currentRound.selectedGameActionIds.length,
      );
      state = reducer(state, {
        type: 'NEXT_ROUND',
        payload: {
          closedRound: closeRound(state, config),
          gremlin: rollGremlin(state, config),
        },
      });
    }
  }

  const [appState] = deriveAppState(
    { ...state, ui: { review: false, view: 'welcome' } },
    config,
  );

  const scores: Record<string, number> = {};
  Object.entries(scorings).forEach(([key, scoring]) => {
    scores[key] = scoring.get(appState, state);
  });

  if (considerGame(appState, state)) {
    registerGame(
      {
        state,
        finished: new Date().getTime(),
        scores,
      },
      index,
    );
  }

  bar.update(index + 1);
}

bar.stop();

function registerGame(sim: Simulation, i: number) {
  const irrelevant: number[] = [];
  allScores.push(Object.values(sim.scores));
  scoringKeys.forEach((key) => {
    relevantSims[i] = sim;

    const sort = { ...(customSort[key] || defaultSort) };
    const sortKeys = [
      key,
      ...(Object.keys(sort) as (keyof typeof sort)[]).filter((k) => k !== key),
    ];
    sort[key] = 'desc';

    bestGames[key].push(i);
    bestGames[key].sort((a, b) => {
      const simA = relevantSims[a];
      const simB = relevantSims[b];

      for (let i = 0; i < sortKeys.length; i++) {
        const sortKey = sortKeys[i];
        const scoreA = simA.scores[sortKey];
        const scoreB = simB.scores[sortKey];
        if (scoreA === scoreB) {
          /* scores are same, use next key */
          continue;
        }

        return sort[sortKey] === 'desc' ? scoreA - scoreB : scoreB - scoreA;
      }

      /* If all scores are same, fall back to id */
      return a - b;
    });
    if (bestGames[key].length > (createCSVFor.includes(key) ? STORE_BEST : 1)) {
      /* cut of worst of the best games */
      const removed = bestGames[key].splice(0, 1);
      irrelevant.push(...removed);
    }

    worstGames[key].push(i);
    worstGames[key].sort((a, b) => {
      const simA = relevantSims[a];
      const simB = relevantSims[b];

      for (let i = 0; i < sortKeys.length; i++) {
        const sortKey = sortKeys[i];
        const scoreA = simA.scores[sortKey];
        const scoreB = simB.scores[sortKey];
        if (scoreA === scoreB) {
          /* scores are same, use next key */
          continue;
        }

        return sort[sortKey] === 'asc' ? scoreA - scoreB : scoreB - scoreA;
      }

      /* If all scores are same, fall back to id */
      return b - a;
    });
    if (
      worstGames[key].length > (createCSVFor.includes(key) ? STORE_WORST : 1)
    ) {
      /* cut of worst of the best games */
      const removed = worstGames[key].splice(0, 1);
      irrelevant.push(...removed);
    }
  });

  /* Remove simulations that are not relevant for any score to free up memory */
  Array.from(new Set(irrelevant)).forEach((out) => {
    const someoneLikesMe = scoringKeys.some(
      (key) => bestGames[key].includes(out) || worstGames[key].includes(out),
    );
    if (!someoneLikesMe) {
      delete relevantSims[out];
    }
  });
}

/* Create and wrote Results file */
const results = {
  relevantSims,
  data: allScores,
  simulateConfig,
  defaultSort,
  customSort,
  scoringConfig: scorings,
};

export type Results = typeof results;

console.log('\n\nWriting results...');

fs.writeFileSync(__dirname + '/results.json', JSON.stringify(results));

createCSVFor.forEach((key) => {
  const best = getLines(bestGames[key].reverse());
  const worst = getLines(
    worstGames[key],
    simulationsToRun - worstGames[key].length,
  );

  fs.writeFileSync(
    `${__dirname}/results/${key}.csv`,
    stringify([
      Object.keys(best[0]),
      ...best.map((d) => Object.values(d)),
      ...worst.map((d) => Object.values(d)),
    ]),
  );
});

function getLines(simIds: number[], offset: number = 0) {
  return simIds.map((id, i) => {
    const game: Record<string, string | number> = { '#': i + offset + 1 };

    const { state, finished, scores } = relevantSims[id];

    scoringKeys.forEach((key) => {
      game[scorings[key].name] = scores[key];
    });

    // Need each of the Actions, Gremlins and Stories complete in their own CSV block, so each will get its own loop.

    // Actions Block
    state.pastRounds.forEach((round, roundI) => {
      for (let actionI = 0; actionI < maxSelectedActions; actionI++) {
        game[`Round ${roundI + 1} Action ${actionI + 1}`] =
          round.selectedGameActionIds[actionI] || '';
      }
    });

    // Gremlins Blo
    state.pastRounds.forEach((round, roundI) => {
      game[`Round ${roundI + 1} Gremlin`] = round.gremlin || '';
    });

    // Stories complete block
    state.pastRounds.forEach((round, roundI) => {
      game[`Round ${roundI + 1} Stories Completed`] = round.storiesCompleted;
    });

    game.simulationId = id;
    game.simulationTime = new Date(finished).toISOString();
    if (INCLUDE_LINK) {
      game.link = stateLink(
        'https://teamsgame.agilepainrelief.com',
        null,
        {
          ...state,
          ui: { view: 'actions', review: 0 },
        },
        finished,
        simulateConfig,
      );
    }
    return game;
  });
}

console.log(
  '\nDone!\n\nTo inspect results start the dev-server with\n  npm start\n\nand open\n  http://localhost:3000/results',
);
