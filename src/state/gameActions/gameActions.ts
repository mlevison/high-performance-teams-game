import { GameActionList } from './types';
import { unique, hasNoEffect, combine, fromRound, requires } from './helpers';

export type GameActionId =
  | 'GAME_ACTION_BUILD_SERVER'
  | 'GAME_ACTION_TEAMS_ON_SAME_FLOOR'
  | 'GAME_ACTION_UNIT_TESTING'
  | 'GAME_ACTION_INFORMAL_CROSS_TRAINING'
  | 'PROTECTED_FROM_OUTSIDE_DISTRACTION'
  | 'WORKING_AGREEMENTS'
  | 'ELIMINATE_LONG_LIVED_FEATURE_BRANCHES';

export const gameActionList: GameActionList = {
  PROTECTED_FROM_OUTSIDE_DISTRACTION: {
    name: 'Protected from Outside Distraction',
    available: unique(),
    description: 'ScrumMaster protects the team from outside distraction',
    cost: 1,
    // TODO - the effect is different in that it effects the success die roll
    effect: hasNoEffect,
  },
  WORKING_AGREEMENTS: {
    name: 'Working Agreements',
    available: unique(),
    description: 'Create Team Working Agreements',
    cost: 1,
    // TODO - the effect is different in that it effects the success die roll
    effect: () => ({ capacity: 1 }),
  },
  ELIMINATE_LONG_LIVED_FEATURE_BRANCHES: {
    type: 'ENGINEERING',
    name: 'All Work is done on Main or Trunk',
    available: unique(),
    description:
      'When teams use Feature Branches – then they’re not really using Continuous integration. Feature branching optimizes for the individual while harming the Team',
    cost: 2,
    effect: () => ({ capacity: 1 }),
  },
  GAME_ACTION_BUILD_SERVER: {
    type: 'ENGINEERING',
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
    effect: (age) => ({ capacity: age < 5 ? age + 1 : 5 }),
  },
  GAME_ACTION_UNIT_TESTING: {
    type: 'ENGINEERING',
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
  GAME_ACTION_INFORMAL_CROSS_TRAINING: {
    name: 'Informal Cross Training',
    available: combine([unique(), fromRound(3)]),
    description:
      'Informal cross-training for existing team members in an area the team is weak. (Testing anyone?)',
    cost: 1,
    effect: () => ({ capacity: 1 }),
  },
};
