import { GameActionList, GameAction } from './types';
import example from './images/example.jpg';

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
  | 'GAME_ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION'
  | 'GAME_ACTION_WORKING_AGREEMENTS'
  | 'GAME_ACTION_ELIMINATE_LONG_LIVED_FEATURE_BRANCHES'
  | 'GAME_ACTION_SOCIAL_TIME'
  | 'GAME_ACTION_FIRE_FIGHTER_AWARD'
  | 'GAME_ACTION_OBSERVE_PEOPLE_AND_RELATIONSHIPS'
  | 'GAME_ACTION_ONE_ON_ONES'
  | 'GAME_ACTION_PAIR_PROGRAMMING'
  | 'GAME_ACTION_TEST_DRIVEN_DEVELOPMENT';

export const gameActionList: GameActionList = {
  GAME_ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION: {
    image: 'https://placekitten.com/100/100',
    name: 'Protected from Outside Distraction',
    available: { round: 1 },
    description:
      'ScrumMaster protects the team from outside distraction. Example: A manager asking a team member to do them a small favour as it will only take an hour.',
    cost: 1,
    effect: hasNoEffect,
  },
  GAME_ACTION_REMOTE_TEAM_AVATARS: {
    icon: '👋',
    name: 'Remote Team Avatars',
    available: { round: 1 },
    description:
      "Remote Teams suffer from the start, in that team members don't get know about their colleagues easily. To counter this run a short get to know you session. Get team members to share things like - working hours, city they live in, timezone, contact info. If people are open share some personal details such as hobbies, family status, favorite food and beverage. Some teams even create a wiki or site to share this information ",
    cost: 1,
    effect: () => ({ capacity: 1 }),
  },
  GAME_ACTION_WORKING_AGREEMENTS: {
    image: example,
    name: 'Working Agreements',
    available: { round: 1 },
    description:
      'Working Agreements are a simple, powerful way of creating explicit guidelines for what kind of work culture you want for your Team. They are a reminder for everyone about how they can commit to respectful behaviour and communication',
    cost: 1,
    effect: () => ({ capacity: 1 }),
  },
  GAME_ACTION_BUILD_SERVER: {
    image: example,
    type: 'ENGINEERING',
    name: 'Build Server',
    available: { round: 1 },
    description:
      'Setup Build Server and Continuous Integration. This is required to make future engineering improvements',
    cost: 2,
    effect: hasNoEffect,
  },
  GAME_ACTION_TEAMS_ON_SAME_FLOOR: {
    image: example,
    name: 'Team Members On SameFloor',
    available: { round: 1 },
    description:
      "Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions",
    cost: 3,
    /* don't use arrow function in order to have "this" bound to action */
    effect(age) {
      if (age < 5) {
        return {
          capacity: age + 1,
          title: `${this.name} active since ${age + 1} rounds`,
        };
      }

      return {
        capacity: 5,
        title: `${this.name} active since 5 or more rounds`,
      };
    },
  },
  // Round 2 Actions
  GAME_ACTION_ELIMINATE_LONG_LIVED_FEATURE_BRANCHES: {
    image: example,
    type: 'ENGINEERING',
    name: 'All Work is done on Main or Trunk',
    available: { round: 2 },
    description:
      'When teams use Feature Branches – then they’re not really using Continuous integration. Feature branching optimizes for the individual while harming the Team',
    cost: 2,
    effect: () => ({ capacity: 1 }),
  },
  GAME_ACTION_UNIT_TESTING: {
    image: example,
    type: 'ENGINEERING',
    name: 'Unit Testing',
    available: { round: 2, requires: 'GAME_ACTION_BUILD_SERVER' },
    description: 'TODO: SOME DESCRIPTION',
    cost: 2,
    effect: () => ({ capacity: 2 }),
  },
  GAME_ACTION_SOCIAL_TIME: {
    image: example,
    // type: 'COMMUNICATION',
    name: 'Social Time',
    available: { round: 2 },
    description:
      'Setting aside some time during the working day to talk to your peers outside of the work itself.',
    cost: 1,
    effect: () => ({
      capacity: 1,
      title:
        'This benefits the team, as team members get to know each other not just as doers of work.',
    }),
  },
  GAME_ACTION_FIRE_FIGHTER_AWARD: {
    image: example,
    name: 'Fire Fighter Award',
    available: { round: 2 },
    description:
      'Offer a firefighter award to any team member who solves big problem',
    cost: 1,
    effect: () => ({
      capacity: -1,
      title:
        'Promoting a firefighter culture promotes individual behavior and, surprisingly, the starting of fires.',
    }),
  },

  // Round 3
  GAME_ACTION_OBSERVE_PEOPLE_AND_RELATIONSHIPS: {
    image: example,
    // type: 'COMMUNICATION',
    name: 'Observe People + Relationships',
    available: { round: 3 },
    description:
      'ScrumMaster spends time observing people, how they interact, and the quality of their relationship.',
    cost: 1,
    effect: () => ({
      capacity: 1,
      title: 'Watching the Team tells you where to put your coaching energy.',
    }),
  },
  GAME_ACTION_ONE_ON_ONES: {
    image: example,
    // type: 'COMMUNICATION',
    name: 'One on One',
    available: { round: 3 },
    description:
      'ScrumMaster meets with all team members for a regular one-on-one. Once ‘Gremlins’ start to popup, this action mitigates the worst of the effects, because you already have a deeper understanding of team member needs.',
    cost: 1,
    effect: hasNoEffect,
  },
  GAME_ACTION_PAIR_PROGRAMMING: {
    image: example,
    type: 'ENGINEERING',
    name: 'Pair Programming',
    available: { round: 3 },
    description: 'Two team members – one computer',
    cost: 2,
    effect: () => ({
      capacity: 2,
      title:
        'Team Members working in pairs have a lower defect rate, simpler code and learn from each other.',
    }),
  },
  GAME_ACTION_TEST_DRIVEN_DEVELOPMENT: {
    image: example,
    type: 'ENGINEERING',
    name: 'Test Driven Development',
    available: { round: 3, requires: 'GAME_ACTION_BUILD_SERVER' },
    description: 'Writing Unit level Tests before writing the code',
    cost: 2,
    effect: () => ({
      capacity: 2,
      title:
        'By writing the tests before the code – the Developer is forced to consider the simplest solution to their problem. Result: Less code; simpler design and fewer defects',
    }),
  },
  GAME_ACTION_INFORMAL_CROSS_TRAINING: {
    image: example,
    name: 'Informal Cross Training',
    available: { round: 4 },
    description:
      'Informal cross-training for existing team members in an area the team is weak. (Testing anyone?)',
    cost: 1,
    effect: () => ({
      capacity: 1,
    }),
  },
  GAME_ACTION_FORMAL_CROSS_TRAINING: {
    image: example,
    name: 'Formal Cross-Training',
    available: { round: 4 },
    description:
      'Formal cross-training for existing team members in an area the team is weak. (Testing anyone?)',
    cost: 3,
    effect: () => ({
      capacity: 3,
    }),
  },
};

export const gameActions: GameAction[] = Object.entries(
  gameActionList,
).map(([id, action]) => ({ ...action, id: id as GameActionId }));
