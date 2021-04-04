import type { GameConfig } from '../state/game';
import type { GameActionId } from './rounds';
import { rounds } from './rounds';
import { gremlins } from './gremlins';
import { gameEffects } from './gameEffects';

export type { GameActionId } from './rounds';

export const config: GameConfig<GameActionId> = {
  rounds,
  gremlins,
  gameEffects,
  trailingRounds: 6,
};
