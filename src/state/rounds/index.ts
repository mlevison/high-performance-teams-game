import { rounds } from '../../config';
import { RoundDescription as RoundDescriptionT } from './types';
export { getRoundEffects } from './getRoundEffects';

export type RoundDescription<T extends string> = RoundDescriptionT<T>;
export const startCapacity = rounds['1']?.effect?.([])?.capacity || 0;

// export { startCapacity, roundDescriptions };
