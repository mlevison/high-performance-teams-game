import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round2ActionId =
  | 'ACTION_REMOTE_TEAM_AVATARS'
  | 'ACTION_ELIMINATE_LONG_LIVED_FEATURE_BRANCHES'
  | 'ACTION_UNIT_TESTING'
  | 'ACTION_SOCIAL_TIME'
  | 'ACTION_PROBLEM_SOLVING_BONUS'
  | 'BACKLOG_REFINEMENT';

export const round2: RoundDescription<Round2ActionId> = {
  title: 'Failed Expectations',
  description: (
    <p>
      Your team didn't met our expectations that you would complete 10 User
      Stories in the last round. Our vulture capitalists are becoming concerned
      and ask if you can really deliver? They have decided we need more problem
      solvers on the team.
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
      description: (
        <p>
          Unit Testing is the approach of testing the smallest possible fragment
          of code. It ensures that the code does what the developer expected it
          do.
        </p>
      ),
      cost: 2,
      effect: () => ({ capacityChange: 1 }),
    },
    ACTION_SOCIAL_TIME: {
      image: example,
      type: 'COMMUNICATION',
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
    ACTION_PROBLEM_SOLVING_BONUS: {
      image: example,
      name: 'Problem Solving Award',
      description: (
        <p>
          Offer a bonus to the team member who solves our current site
          performance problem.
        </p>
      ),
      cost: 0,
      effect(age) {
        // First round it has a positive affect, the second round eliminates it. No effect after that.
        let change = 0;
        if (age === 0) {
          change = 1;
        }

        return {
          capacityChange: change,
          title: `${this.name} active since ${age + 1} rounds`,
        };
      },
    },
    BACKLOG_REFINEMENT: {
      image: example,
      type: 'COMMUNICATION',
      name: 'Backlog Refinement',
      description: (
        <p>
          The Development Team and the Product Owner sit down every Sprint. They
          take the time to better understand upcoming features. They might
          estimate or split stories, create acceptance criteria. They also
          create new stories and delete one's that no longer make sense. All of
          this improves their understanding the product they're building.
        </p>
      ),
      cost: 3,
      effect: () => ({ userStoryChance: 15 }),
    },
  },
};
