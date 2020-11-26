import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round3ActionId =
  | 'ACTION_OBSERVE_PEOPLE_AND_RELATIONSHIPS'
  | 'ACTION_ONE_ON_ONES'
  | 'ACTION_PAIR_PROGRAMMING'
  | 'ACTION_TEST_DRIVEN_DEVELOPMENT';

export const round3: RoundDescription<Round3ActionId> = {
  title: 'Work Harder',
  description: (
    <p>
      Things are slowly improving. You are getting better. *Please* work harder
      in the next Sprint.
    </p>
  ),
  actions: {
    ACTION_OBSERVE_PEOPLE_AND_RELATIONSHIPS: {
      image: example,
      type: 'COMMUNICATION',
      name: 'Observe People + Relationships',
      description: (
        <p>
          ScrumMaster spends time observing people, how they interact, and the
          quality of their relationship.
        </p>
      ),
      cost: 1,
      effect: () => ({
        capacity: 1,
        title: 'Watching the Team tells you where to put your coaching energy.',
      }),
    },
    ACTION_ONE_ON_ONES: {
      image: example,
      type: 'COMMUNICATION',
      name: 'One on One',
      description: (
        <p>
          ScrumMaster meets with all team members for a regular one-on-one. Once
          ‘Gremlins’ start to popup, this action mitigates the worst of the
          effects, because you already have a deeper understanding of team
          member needs.
        </p>
      ),
      cost: 1,
    },
    ACTION_PAIR_PROGRAMMING: {
      image: example,
      type: 'ENGINEERING',
      name: 'Pair Programming',
      description: <p>Two team members – one computer</p>,
      cost: 2,
      effect: () => ({
        capacity: 2,
        title:
          'Team Members working in pairs have a lower defect rate, simpler code and learn from each other.',
      }),
    },
    ACTION_TEST_DRIVEN_DEVELOPMENT: {
      image: example,
      type: 'ENGINEERING',
      name: 'Test Driven Development',
      available: { requires: 'ACTION_BUILD_SERVER' },
      description: <p>Writing Unit level Tests before writing the code</p>,
      cost: 2,
      effect: () => ({
        capacity: 2,
        title:
          'By writing the tests before the code – the Developer is forced to consider the simplest solution to their problem. Result: Less code; simpler design and fewer defects',
      }),
    },
  },
};
