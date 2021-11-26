import type { GameConfig } from 'state';

export const simulateConfig: Pick<
  GameConfig,
  'initialScores' | 'trailingRounds'
> = {
  initialScores: {},
  trailingRounds: 22,
};
