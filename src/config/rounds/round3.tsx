import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round3ActionId =
  | 'OBSERVE_PEOPLE_AND_RELATIONSHIPS'
  | 'ONE_ON_ONES'
  | 'PAIR_PROGRAMMING'
  | 'TEST_DRIVEN_DEVELOPMENT'
  | 'STORY_MAPPING_OR_OTHER';

export const round3: RoundDescription<Round3ActionId> = {
  title: 'Work Harder',
  description: (
    <p>
      Things are slowly improving. You are getting better. *Please* work harder
      in the next Sprint.
    </p>
  ),
  actions: {
    OBSERVE_PEOPLE_AND_RELATIONSHIPS: {
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
        capacityChange: 1,
        title: 'Watching the Team tells you where to put your coaching energy.',
      }),
    },
    ONE_ON_ONES: {
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
    PAIR_PROGRAMMING: {
      image: example,
      type: 'ENGINEERING',
      name: 'Pair Programming',
      description: <p>Two team members – one computer</p>,
      cost: 2,
      effect: () => ({
        capacityChange: 1,
        title:
          'Team Members working in pairs have a lower defect rate, simpler code and learn from each other.',
      }),
    },
    STORY_MAPPING_OR_OTHER: {
      image: example,
      type: 'COMMUNICATION',
      name: 'Story Mapping',
      available: { requires: 'CLARIFY_PRODUCT_VISION' },
      description: (
        <p>
          Story Mapping is a strategic tool, that gets Developers and the
          Product Owner to discuss strategy. Story mapping helps link
          understanding of Product Vision with the individual User Stories.
        </p>
      ),
      cost: 2,
      effect: () => ({ userStoryChance: 10 }),
    },
    TEST_DRIVEN_DEVELOPMENT: {
      image: example,
      type: 'ENGINEERING',
      name: 'Test Driven Development',
      available: { requires: 'BUILD_SERVER' },
      description: (
        <p>
          Writing Unit level Tests before writing the code. TDD helps the
          quality by ensuring the developer understands what they're attempting
          to build before they build it. As a side effect it reduces the volume
          of code and its complexity. Thereby reduce the number of defects. This
          skill is takes time to learn.
        </p>
      ),
      cost: 3,
      effect(age) {
        let change = age;
        if (age > 2) {
          change = 2;
        }

        return {
          capacityChange: change,
        };
      },
    },
  },
};
