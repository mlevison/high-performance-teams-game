import type { GameConfig } from '../state/game';

import { rounds } from './rounds';
import { gremlins } from './gremlins';
import { gameEffects } from './gameEffects';

export const config: GameConfig = {
  rounds,
  gremlins,
  gameEffects,
  trailingRounds: 6,
};
