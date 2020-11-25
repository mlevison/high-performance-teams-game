import { isCapacityEffect } from 'state/effects';
import { rounds } from '../../config';
import { RoundDescription as RoundDescriptionT } from './types';
export { getRoundEffects } from './getRoundEffects';

export type RoundDescription<T extends string> = RoundDescriptionT<T>;

const round1Effect = rounds['1']?.effect?.([], 1);
export const startCapacity =
  round1Effect && isCapacityEffect(round1Effect) ? round1Effect.capacity : 0;
