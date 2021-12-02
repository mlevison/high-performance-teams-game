import type { AppState, GameState } from '../state';
import type { GameActionId, GremlinId } from '../config';
import type { LineProps } from 'recharts';
import { sumByProp } from '../lib';

interface Scoring {
  name: string;
  config: Partial<Omit<LineProps, 'ref' | 'yAxisId'>>;
  get: (
    appState: AppState<GameActionId, GremlinId>,
    gameState: GameState<GameActionId, GremlinId>,
  ) => number;
}

export const capacity: Scoring = {
  name: 'Total capacity',
  config: {
    stroke: '#0c79df',
  },
  get(appState) {
    return appState.currentRound.capacity.total;
  },
};

export const gremlinChance: Scoring = {
  name: 'Final gremlin chance',
  config: {
    stroke: '#df2c0c',
    unit: '%',
  },
  get(appState) {
    return appState.currentRound.gremlinChance;
  },
};

export const userStoryChance: Scoring = {
  name: 'Final chance of completing user stories',
  config: {
    stroke: '#e2d02f',
    unit: '%',
  },
  get(appState) {
    return appState.currentRound.userStoryChance;
  },
};

export const selectedActions: Scoring = {
  name: 'Actions selected throughout game',
  config: {
    stroke: '#0cdfc3',
  },
  get(_, gameState) {
    return gameState.pastRounds.reduce(
      (i, { selectedGameActionIds }) => i + selectedGameActionIds.length,
      0,
    );
  },
};

export const ocurredGremlins: Scoring = {
  name: 'Gremlins ocurred throughout game',
  config: {
    stroke: '#df8b0c',
  },
  get(_, gameState) {
    return gameState.pastRounds.filter(({ gremlin }) => gremlin !== null)
      .length;
  },
};

export const storiesAttempted: Scoring = {
  name: 'Total user stories attempted',
  config: {
    stroke: '#cd66e7',
  },
  get(appState) {
    return sumByProp(
      appState.pastRounds.map((round) => ({
        storiesAttempted: round.capacity.available,
      })),
      'storiesAttempted',
    );
  },
};

export const storiesCompleted: Scoring = {
  name: 'Total user stories completed',
  config: {
    stroke: '#1be400',
  },
  get(appState) {
    return sumByProp(appState.pastRounds, 'storiesCompleted');
  },
};

export const combinedScore: Scoring = {
  name: 'Combined Score',
  config: {
    stroke: '#7600e4',
  },
  get(appState, gameState) {
    const normalizedCapacity = capacity.get(appState, gameState) * 2;
    const normalizedUserStoryChance =
      Math.round((userStoryChance.get(appState, gameState) + 15) / 3) * 2;

    return normalizedCapacity + normalizedUserStoryChance;
  },
};
