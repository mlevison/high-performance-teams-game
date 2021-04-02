import { GameRound } from '../round';

type InvisibleEffectProps = {
  title: false;
  description?: never;
};
type VisibleEffectProps = {
  title: string;
  description?: string;
};
export type EffectDescription = InvisibleEffectProps | VisibleEffectProps;
export type BaseEffect = {
  userStoryChange?: number;
  gremlinChange?: number;
  capacityChange?: number;
  /** @deprecated this prop does not exist, use userStoryChange */
  userStoryChance?: never;
  /** @deprecated this prop does not exist, use gremlinChange */
  gremlinChance?: never;
  /** @deprecated this prop does not exist, use capacityChange */
  capacityChance?: never;
};
export type InvisibleEffect = BaseEffect & InvisibleEffectProps;
export type VisibleEffect = BaseEffect & VisibleEffectProps;
export type Effect = BaseEffect & EffectDescription;
export type GameEffect = (rounds: GameRound[]) => Effect[] | Effect | null;
