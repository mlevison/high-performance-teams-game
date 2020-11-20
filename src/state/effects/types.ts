import { Round } from '../round';
import { EFFECT_HIDDEN } from '../../constants';

type CapacityEffectProps = {
  capacity: number;
};
type UserStoryChanceEffectProps = {
  userStoryChance: number;
};
type InvisibleEffectProps = {
  title: typeof EFFECT_HIDDEN;
  description?: never;
};
type VisibleEffectProps = {
  title: string;
  description?: string;
};
export type EffectDescription = InvisibleEffectProps | VisibleEffectProps;
export type BaseEffect = CapacityEffectProps | UserStoryChanceEffectProps;

export type InvisibleEffect<T extends BaseEffect> = T & InvisibleEffectProps;
export type VisibleEffect<T extends BaseEffect> = T & VisibleEffectProps;
export type CapacityEffect<T extends EffectDescription> = T &
  CapacityEffectProps;
export type UserStoryChanceEffect<T extends EffectDescription> = T &
  UserStoryChanceEffectProps;

export type Effect = BaseEffect & EffectDescription;
export type GameEffect = (rounds: Round[]) => Effect | null;
