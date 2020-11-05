import { Round } from '../round';
export const EFFECT_HIDDEN = Symbol('EFFECT_HIDDEN');

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
