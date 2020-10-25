import { GameActionList } from './types';
import { unique, hasNoEffect, combine, fromRound, requires } from './helpers';

export type GameActionId =
  | 'GAME_ACTION_BUILD_SERVER'
  | 'GAME_ACTION_TEAMS_ON_SAME_FLOOR'
  | 'GAME_ACTION_UNIT_TESTING';

export const gameActionList: GameActionList = {
  GAME_ACTION_BUILD_SERVER: {
    name: 'Build Server',
    available: unique(),
    description:
      'Setup Build Server and Continuous Integration. This is required to make future engineering improvements',
    cost: 2,
    effect: hasNoEffect,
  },
  GAME_ACTION_TEAMS_ON_SAME_FLOOR: {
    name: 'Team Members On SameFloor',
    available: unique(),
    description:
      "Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions",
    cost: 3,
    effect: () => ({ capacity: 2 }),
  },
  GAME_ACTION_UNIT_TESTING: {
    name: 'Unit Testing',
    available: combine([
      unique(),
      fromRound(2),
      requires('GAME_ACTION_BUILD_SERVER'),
    ]),
    description: 'TODO: SOME DESCRIPTION',
    cost: 2,
    effect: () => ({ capacity: 2 }),
  },
};
