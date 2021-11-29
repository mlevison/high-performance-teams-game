import type { OverwritableConfig } from '../state';
import type { SimulationWithoutCombinedScore } from './index';

export const INCLUDE_LINK = true;
export const STORE_BEST = 300;
export const STORE_WORST = 300;

export const simulateConfig: OverwritableConfig = {
  trailingRounds: 22,
};

export const calculateCombinedScore = (sim: SimulationWithoutCombinedScore) => {
  const normalizedCapacity = sim.final.capacity * 2;
  const normalizedUserStoryChance =
    Math.round((sim.final.userStoryChance + 15) / 3) * 2;

  return normalizedCapacity + normalizedUserStoryChance;
};

export { always3 as actionSelector } from './actionSelectors';
