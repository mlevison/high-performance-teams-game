import { roundDescriptions } from './roundDescriptions';
export { getRoundDescriptionEffects } from './getRoundDescriptionEffects';

const startCapacity = roundDescriptions['1']?.effect?.([])?.capacity || 0;

export { startCapacity, roundDescriptions };
