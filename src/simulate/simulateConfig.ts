import type { AppState, GameState, OverwritableConfig } from '../state';
import type { GameActionId, GremlinId } from '../config';
import {
  capacity,
  gremlinChance,
  userStoryChance,
  selectedActions,
  ocurredGremlins,
  storiesAttempted,
  storiesCompleted,
  combinedScore,
} from './scorings';

export const INCLUDE_LINK = true;
export const STORE_BEST = 600;
export const STORE_WORST = 600;
export const ACTION_CHANCE = 0.25;
const MIN_GREMLINS = 5;

export const simulateConfig: OverwritableConfig = {
  trailingRounds: 7,
};

/* Return false to not completely ignore that game regardless of other scores */
export function considerGame(
  appState: AppState<GameActionId, GremlinId>,
  gameState: GameState<GameActionId, GremlinId>,
): boolean {
  /* Ignore games with 0 or 1 gremlin */
  if (ocurredGremlins.get(appState, gameState) < MIN_GREMLINS) {
    return false;
  }

  return true;
}

/**
 * Tells the simulator which scores to calculate and how
 * @see scorings.tsx
 */
export const scorings = {
  combinedScore,
  capacity,
  gremlinChance,
  userStoryChance,
  selectedActions,
  ocurredGremlins,
  storiesAttempted,
  storiesCompleted,
};

type ScoringKey = keyof typeof scorings;
type SortDir = 'asc' | 'desc';
type Sort = Partial<Record<ScoringKey, SortDir>>;

/* only create csv output for these scores */
export const createCSVFor: ScoringKey[] = ['combinedScore'];

/* Results will be sub-sorted based on these scores in the given order */
export const defaultSort: Record<ScoringKey, SortDir> = {
  combinedScore: 'desc',
  capacity: 'desc',
  userStoryChance: 'desc',
  gremlinChance: 'desc',
  storiesAttempted: 'desc',
  storiesCompleted: 'desc',
  selectedActions: 'desc',
  ocurredGremlins: 'asc',
};

/* Custom sort config for scoring key */
export const customSort: Partial<Record<ScoringKey, Sort>> = {};

export { atLeast1andAtMost3 as actionSelector } from './actionSelectors';
