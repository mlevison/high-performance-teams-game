import { ReactNode } from 'react';
import { EffectDescription, BaseEffect, Effect } from '../effects';

type EffectWithOptionalTitle = Partial<EffectDescription> & BaseEffect;
export type AvailabilityCheck = (
  currentRound: number,
  finishedActionIds: string[],
  selectedGameActionIds: string[],
  id: string,
) => boolean;
type Image = {
  /**
   * An image url
   * can be externally hosted image
   * `https://example.org/my.png`
   * or relative file:
   * `import imageUrl from './my.png';
   */
  image: string;
};

export type Icon = {
  /**
   * Unicode Character to be displayed instead of image
   * can be emoji or any other char
   */
  icon: string;
};

type ImageOrIcon = Image | Icon;

export type GameActionWithImage<GameActionId extends string> = FullGameAction<
  GameActionId
> &
  Image;
export type GameActionWithIcon<GameActionId extends string> = FullGameAction<
  GameActionId
> &
  Icon;

export type GameActionImplementation<GameActionId extends string> = {
  type?: string;
  available?: {
    requires?: GameActionId[] | GameActionId;
    unique?: false;
  };
  effect?: (
    age: number,
    finishedActionIds: GameActionId[],
  ) => Effect[] | EffectWithOptionalTitle | null;
  name: string;
  description: ReactNode;
  cost: number;
};
type FullGameAction<GameActionId extends string> = GameActionImplementation<
  GameActionId
> & {
  id: GameActionId;
  round: number;
};
export type GameActionList<Key extends string, GameActionId extends string> = {
  [K in Key]: ImageOrIcon & GameActionImplementation<GameActionId>;
};

export type GameAction<GameActionId extends string = string> = ImageOrIcon &
  FullGameAction<GameActionId>;
