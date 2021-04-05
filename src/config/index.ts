import type { GameConfig } from '../state';
import type { GameActionId } from './rounds';
import type { GremlinId } from './gremlins';
import { rounds } from './rounds';
import { gremlins } from './gremlins';
import { gameEffects } from './gameEffects';

export type { GameActionId } from './rounds';
export type { GremlinId } from './gremlins';

export const config: GameConfig<GameActionId, GremlinId> = {
  rounds,
  gremlins,
  gameEffects,
  trailingRounds: 6,
};
