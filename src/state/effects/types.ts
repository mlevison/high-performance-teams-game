import { Round } from '../round';
import { EFFECT_HIDDEN } from '../../constants';

export const GREMLIN_CHANGE_KEY = 'gremlinChange';
export const CAPACITY_CHANGE_KEY = 'capacityChange';
export const USER_STORY_CHANGE_KEY = 'userStoryChange';

type GremlinChanceEffectProps = {
  [GREMLIN_CHANGE_KEY]: number;
  [CAPACITY_CHANGE_KEY]?: never;
  [USER_STORY_CHANGE_KEY]?: never;
};
type CapacityEffectProps = {
  [GREMLIN_CHANGE_KEY]?: never;
  [CAPACITY_CHANGE_KEY]: number;
  [USER_STORY_CHANGE_KEY]?: never;
};
type UserStoryChanceEffectProps = {
  [CAPACITY_CHANGE_KEY]?: never;
  [GREMLIN_CHANGE_KEY]?: never;
  [USER_STORY_CHANGE_KEY]: number;
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
export type BaseEffect =
  | CapacityEffectProps
  | UserStoryChanceEffectProps
  | GremlinChanceEffectProps;

export type InvisibleEffect<T extends BaseEffect> = T & InvisibleEffectProps;
export type VisibleEffect<T extends BaseEffect> = T & VisibleEffectProps;
export type CapacityEffect<T extends EffectDescription> = T &
  CapacityEffectProps;
export type UserStoryChanceEffect<T extends EffectDescription> = T &
  UserStoryChanceEffectProps;
export type GremlinChanceEffect<T extends EffectDescription> = T &
  GremlinChanceEffectProps;

export type Effect = BaseEffect & EffectDescription;
export type GameEffect = (rounds: Round[]) => Effect[] | Effect | null;
