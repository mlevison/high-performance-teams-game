import type { OverwritableConfig } from '../state';
import type { SimulationWithoutCombinedScore } from './index';

export const INCLUDE_LINK = true;
export const STORE_BEST = 600;
export const STORE_WORST = 600;

export const simulateConfig: OverwritableConfig = {
  trailingRounds: 7,
};

export const calculateCombinedScore = (sim: SimulationWithoutCombinedScore) => {
  const normalizedCapacity = sim.final.capacity * 2;
  const normalizedUserStoryChance =
    Math.round((sim.final.userStoryChance + 15) / 3) * 2;

  return normalizedCapacity + normalizedUserStoryChance;
};

export { atLeast1andAtMost3 as actionSelector } from './actionSelectors';
