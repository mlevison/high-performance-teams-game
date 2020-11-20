import { Round } from '../round';
import { EFFECT_HIDDEN } from '../../constants';

export type VisibleEffect = {
  capacity: number;
  title: string;
  description?: string;
};
export type Effect =
  | VisibleEffect
  | {
      capacity: number;
      title: typeof EFFECT_HIDDEN;
    };

export type GameEffect = (rounds: Round[]) => Effect | null;
