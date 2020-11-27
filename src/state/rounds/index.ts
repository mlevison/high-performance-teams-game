import { isCapacityEffect, isUserStoryChanceEffect } from 'state/effects';
import { rounds } from '../../config';
import { RoundDescription as RoundDescriptionT } from './types';
export { getRoundEffects } from './getRoundEffects';

export type RoundDescription<T extends string> = RoundDescriptionT<T>;

const round1Effect = rounds['1']?.effect?.([], 1);
export const startCapacity =
  round1Effect && isCapacityEffect(round1Effect)
    ? round1Effect.capacityChange
    : 0;
export const startUserStoryChance =
  round1Effect && isUserStoryChanceEffect(round1Effect)
    ? round1Effect.userStoryChance
    : 0;
