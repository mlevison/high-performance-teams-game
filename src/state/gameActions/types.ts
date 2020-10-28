import { Effect } from '../effects';
import { GameActionId } from './gameActions';

export type AvailabilityCheck = (
  currentRound: number,
  finishedActionIds: GameActionId[],
  selectedGameActionIds: GameActionId[],
  id: GameActionId,
) => boolean;
type GameActionImplementation = {
  type?: 'ENGINEERING';
  available: AvailabilityCheck;
  effect: (age: number, finishedActionIds: GameActionId[]) => Effect;
  name: string;
  description: string;
  cost: number;
};
export type GameActionList = {
  [K in GameActionId]: GameActionImplementation;
};
export type GameAction = GameActionImplementation & { id: GameActionId };
