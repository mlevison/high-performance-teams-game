import { Effect } from '../effects';
import { GameActionId } from './gameActions';

type EffectWithOptionalTitle = Omit<Effect, 'title'> & {
  title?: Effect['title'];
};
export type AvailabilityCheck = (
  currentRound: number,
  finishedActionIds: GameActionId[],
  selectedGameActionIds: GameActionId[],
  id: GameActionId,
) => boolean;
type GameActionImplementation = {
  type?: 'ENGINEERING';
  available: {
    round: number;
    requires?: GameActionId[] | GameActionId;
    unique?: false;
  };
  effect: (
    age: number,
    finishedActionIds: GameActionId[],
  ) => EffectWithOptionalTitle | null;
  name: string;
  description: string;
  cost: number;
};
export type GameActionList = {
  [K in GameActionId]: GameActionImplementation;
};
export type GameAction = GameActionImplementation & { id: GameActionId };
