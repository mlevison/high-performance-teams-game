import { Effect } from '../effects';
import { GameActionId } from './gameActions';

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
): action is GameActionWithId & Image {
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
): action is GameActionWithId & Icon {
  return Object.getOwnPropertyNames(action).includes('icon');
}
type ImageOrIcon = Image | Icon;

type GameActionImplementation = {
  type?: 'ENGINEERING';
  available: {
    round: number;
    requires?: GameActionId[] | GameActionId;
    unique?: false;
  };
  effect: (age: number, finishedActionIds: GameActionId[]) => Effect | null;
  name: string;
  description: string;
  cost: number;
};
type GameActionWithId = GameActionImplementation & { id: GameActionId };

export type GameActionList = {
  [K in GameActionId]: ImageOrIcon & GameActionImplementation;
};

export type GameAction = ImageOrIcon & GameActionWithId;
