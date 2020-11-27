import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round2ActionId =
  | 'ACTION_REMOTE_TEAM_AVATARS'
  | 'ACTION_ELIMINATE_LONG_LIVED_FEATURE_BRANCHES'
  | 'ACTION_UNIT_TESTING'
  | 'ACTION_SOCIAL_TIME'
  | 'ACTION_FIRE_FIGHTER_AWARD';

export const round2: RoundDescription<Round2ActionId> = {
  title: 'Failed Expectations',
  description: (
    <p>
      Your team didn't met our expectations that you would complete 10 User
      Stories in the last round. Our vulture capitalists are becoming concerned
      and ask if you can really deliver?
    </p>
  ),
  actions: {
    ACTION_REMOTE_TEAM_AVATARS: {
      icon: '👋',
      name: 'Remote Team Avatars',
      description: (
        <p>
          Remote Teams suffer from the start, in that team members don't get
          know about their colleagues easily. To counter this run a short get to
          know you session. Get team members to share things like - working
          hours, city they live in, timezone, contact info. If people are open
          share some personal details such as hobbies, family status, favorite
          food and beverage. Some teams even create a wiki or site to share this
          information
        </p>
      ),
      cost: 1,
      effect: () => ({ capacityChange: 1 }),
    },
    ACTION_ELIMINATE_LONG_LIVED_FEATURE_BRANCHES: {
      image: example,
      type: 'ENGINEERING',
      name: 'All Work is done on Main or Trunk',
      description: (
        <p>
          When teams use Feature Branches – then they’re not really using
          Continuous integration. Feature branching optimizes for the individual
          while harming the Team
        </p>
      ),
      cost: 2,
      effect: () => ({ capacityChange: 1 }),
    },
    ACTION_UNIT_TESTING: {
      icon: '🏗',
      type: 'ENGINEERING',
      name: 'Unit Testing',
      available: { requires: 'ACTION_BUILD_SERVER' },
      description: <p>TODO: SOME DESCRIPTION</p>,
      cost: 2,
      effect: () => ({ capacityChange: 2 }),
    },
    ACTION_SOCIAL_TIME: {
      image: example,
      // type: 'COMMUNICATION',
      name: 'Social Time',
      description: (
        <p>
          Setting aside some time during the working day to talk to your peers
          outside of the work itself.
        </p>
      ),
      cost: 1,
      effect: () => ({
        capacityChange: 1,
        title:
          'This benefits the team, as team members get to know each other not just as doers of work.',
      }),
    },
    ACTION_FIRE_FIGHTER_AWARD: {
      image: example,
      name: 'Fire Fighter Award',
      description: (
        <p>
          Offer a firefighter award to any team member who solves big problem
        </p>
      ),
      cost: 1,
      effect: () => ({
        capacityChange: -1,
        title:
          'Promoting a firefighter culture promotes individual behavior and, surprisingly, the starting of fires.',
      }),
    },
  },
};
