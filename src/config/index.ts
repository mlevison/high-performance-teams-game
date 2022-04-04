import type { GameConfig } from '../state';
import type { GameActionId } from './rounds';
import type { GremlinId } from './gremlins';
import { rounds } from './rounds';
import { gremlins } from './gremlins';
import { gameEffects } from './gameEffects';

export type { GameActionId } from './rounds';
export type { GremlinId } from './gremlins';

const INITIAL_CAPACITY = 10;
const INITIAL_USER_STORY_CHANCE = 30;
const INITIAL_GREMLIN_CHANCE = 0;
export const ROUND3_GREMLIN_CHANCE = 40;
const TRAILING_ROUNDS = 6;

export const config: GameConfig<GameActionId, GremlinId> = {
  initialScores: {
    capacityChange: INITIAL_CAPACITY,
    userStoryChange: INITIAL_USER_STORY_CHANCE,
    gremlinChange: INITIAL_GREMLIN_CHANCE,
  },
  rounds,
  gremlins,
  gameEffects,
  trailingRounds: TRAILING_ROUNDS,
};
