import { GameRound } from '../round';
import { EFFECT_HIDDEN } from '../../constants';

type InvisibleEffectProps = {
  title: typeof EFFECT_HIDDEN;
  description?: never;
};
type VisibleEffectProps = {
  title: string;
  description?: string;
};
export type EffectDescription = InvisibleEffectProps | VisibleEffectProps;
export type BaseEffect = {
  gremlinChange?: number;
  capacityChange?: number;
  userStoryChange?: number;
};
export type InvisibleEffect = BaseEffect & InvisibleEffectProps;
export type VisibleEffect = BaseEffect & VisibleEffectProps;
export type Effect = BaseEffect & EffectDescription;
export type GameEffect = (rounds: GameRound[]) => Effect[] | Effect | null;
