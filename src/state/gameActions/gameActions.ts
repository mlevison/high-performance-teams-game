import { GameActionList, GameAction } from './types';

export function hasNoEffect() {
  return null;
}

export type GameActionId =
  | 'GAME_ACTION_BUILD_SERVER'
  | 'GAME_ACTION_REMOTE_TEAM_AVATARS'
  | 'GAME_ACTION_TEAMS_ON_SAME_FLOOR'
  | 'GAME_ACTION_UNIT_TESTING'
  | 'GAME_ACTION_INFORMAL_CROSS_TRAINING'
  | 'GAME_ACTION_FORMAL_CROSS_TRAINING'
  | 'PROTECTED_FROM_OUTSIDE_DISTRACTION'
  | 'WORKING_AGREEMENTS'
  | 'ELIMINATE_LONG_LIVED_FEATURE_BRANCHES';

export const gameActionList: GameActionList = {
  PROTECTED_FROM_OUTSIDE_DISTRACTION: {
    name: 'Protected from Outside Distraction',
    available: { round: 1 },
    description: 'ScrumMaster protects the team from outside distraction',
    cost: 1,
    effect: hasNoEffect,
  },
  GAME_ACTION_REMOTE_TEAM_AVATARS: {
    name: 'Remote Team Avatars',
    available: { round: 1 },
    description:
      "Remote Teams suffer from the start, in that team members don't get know about their colleagues easily. To counter this run a short get to know you session. Get team members to share things like - working hours, city they live in, timezone, contact info. If people are open share some personal details such as hobbies, family status, favorite food and beverage. Some teams even create a wiki or site to share this information ",
    cost: 1,
    effect: () => ({ capacity: 1, title: 'Remote Team Avatars active' }),
  },
  WORKING_AGREEMENTS: {
    name: 'Working Agreements',
    available: { round: 1 },
    description: 'Create Team Working Agreements',
    cost: 1,
    effect: () => ({ capacity: 1, title: 'TODO: #30 Working Agreements active' }),
  },
  ELIMINATE_LONG_LIVED_FEATURE_BRANCHES: {
    type: 'ENGINEERING',
    name: 'All Work is done on Main or Trunk',
    available: { round: 1 },
    description:
      'When teams use Feature Branches – then they’re not really using Continuous integration. Feature branching optimizes for the individual while harming the Team',
    cost: 2,
    effect: () => ({
      capacity: 1,
      title: 'TODO: All Work is done on Main or Trunk active',
    }),
  },
  GAME_ACTION_BUILD_SERVER: {
    type: 'ENGINEERING',
    name: 'Build Server',
    available: { round: 1 },
    description:
      'Setup Build Server and Continuous Integration. This is required to make future engineering improvements',
    cost: 2,
    effect: hasNoEffect,
  },
  GAME_ACTION_TEAMS_ON_SAME_FLOOR: {
    name: 'Team Members On SameFloor',
    available: { round: 1 },
    description:
      "Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions",
    cost: 3,
    effect: (age) => {
      if (age < 5) {
        return {
          capacity: age + 1,
          title: `TODO: Team on same floor since ${age + 1} rounds`,
        };
      }

      return {
        capacity: 5,
        title: `TODO: Team on same floor since 5 or more rounds`,
      };
    },
  },
  GAME_ACTION_UNIT_TESTING: {
    type: 'ENGINEERING',
    name: 'Unit Testing',
    available: { round: 2, requires: 'GAME_ACTION_BUILD_SERVER' },
    description: 'TODO: SOME DESCRIPTION',
    cost: 2,
    effect: () => ({ capacity: 2, title: 'TODO: Unit Testing active' }),
  },
  GAME_ACTION_INFORMAL_CROSS_TRAINING: {
    name: 'Informal Cross Training',
    available: { round: 4 },
    description:
      'Informal cross-training for existing team members in an area the team is weak. (Testing anyone?)',
    cost: 1,
    effect: () => ({
      capacity: 1,
      title: 'TODO: Informal Cross Training active',
    }),
  },
  GAME_ACTION_FORMAL_CROSS_TRAINING: {
    name: 'Formal Cross-Training',
    available: { round: 4 },
    description:
      'Formal cross-training for existing team members in an area the team is weak. (Testing anyone?)',
    cost: 3,
    effect: () => ({
      capacity: 3,
      title: 'TODO: Informal Cross Training active',
    }),
  },
};

export const gameActions: GameAction[] = Object.entries(
  gameActionList,
).map(([id, action]) => ({ ...action, id: id as GameActionId }));
