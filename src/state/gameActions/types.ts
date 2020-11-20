import { ReactNode } from 'react';
import { GameActionId } from '../../config';
import { EffectDescription, BaseEffect } from '../effects';

type EffectWithOptionalTitle = Partial<EffectDescription> & BaseEffect;
export type AvailabilityCheck = (
  currentRound: number,
  finishedActionIds: GameActionId[],
  selectedGameActionIds: GameActionId[],
  id: GameActionId,
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
export function isGameActionWithImage(
  action: GameAction,
): action is FullGameAction & Image {
  return Object.getOwnPropertyNames(action).includes('image');
}
type Icon = {
  /**
   * Unicode Character to be displayed instead of image
   * can be emoji or any other char
   */
  icon: string;
};
export function isGameActionWithIcon(
  action: GameAction,
): action is FullGameAction & Icon {
  return Object.getOwnPropertyNames(action).includes('icon');
}
type ImageOrIcon = Image | Icon;

type GameActionImplementation = {
  type?: 'ENGINEERING';
  available?: {
    requires?: GameActionId[] | GameActionId;
    unique?: false;
  };
  effect?: (
    age: number,
    finishedActionIds: GameActionId[],
  ) => EffectWithOptionalTitle | null;
  name: string;
  description: ReactNode;
  cost: number;
};
type FullGameAction = GameActionImplementation & {
  id: GameActionId;
  round: number;
};
export type GameActionList<T extends string> = {
  [K in T]: ImageOrIcon & GameActionImplementation;
};

export type GameAction = ImageOrIcon & FullGameAction;
