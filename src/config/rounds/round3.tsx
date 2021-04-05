import React from 'react';
import type { RoundDescription } from './index';
import example from './images/example.jpg';

export type Round3ActionId =
  | 'IMPROVE_RETROSPECTIVES_CHANGE_AGENDA'
  | 'OBSERVE_PEOPLE_AND_RELATIONSHIPS'
  | 'ONE_ON_ONES'
  | 'PAIR_PROGRAMMING'
  | 'STORY_MAPPING_OR_OTHER'
  | 'REFACTORING';

export const round3: RoundDescription<Round3ActionId> = {
  title: 'Work Harder',
  description: (
    <p>
      Things are slowly improving. You are getting better. *Please* work harder
      in the next Sprint.
    </p>
  ),
  effect: () => ({ title: false, gremlinChange: 50 }),
  actions: {
    IMPROVE_RETROSPECTIVES_CHANGE_AGENDA: {
      image: example,
      type: 'COMMUNICATION',
      name: 'Change Retrospective Style',
      description: (
        <>
          <p>
            ScrumMaster changes the Retrospective Agenda and activies every
            Sprint
          </p>
          <p>
            For a deeper understanding see:{' '}
            <a href="https://agilepainrelief.com/blog/agile-retrospectives.html">
              Agile Retrospectives
            </a>
          </p>
        </>
      ),
      cost: 1,
      effect(age) {
        let description =
          'Changing Retrospective Agendas reengergizes them and tends to find different problems each title';
        if (age === 0) {
          return {
            title: description,
            capacityChange: 0,
          };
        }
        if (age < 2) {
          return {
            title: description,
            capacityChange: 1,
          };
        }
        if (age === 2 || age === 3) {
          return {
            title: description,
            capacityChange: 2,
          };
        }
        return {
          title: description,
          capacityChange: 3,
        };
      },
    },
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
          Story Mapping is a strategic tool that gets Developers and the Product
          Owner to discuss strategy. Story mapping helps link understanding of
          Product Vision with the individual User Stories.
        </p>
      ),
      cost: 2,
      effect: () => ({ userStoryChange: 10 }),
    },
    REFACTORING: {
      image: example,
      type: 'ENGINEERING',
      name: 'Refactoring',
      available: { requires: 'BUILD_SERVER' },
      description: (
        <p>
          Refactoring is the process of restructuring existing code without
          changing its external behavior. It is intended to improve the design
          and structure, while preserving its functionality. As a side effect,
          it can reduces the volume of code and its complexity.
        </p>
      ),
      cost: 1,
      effect: () => ({
        capacityChange: 1,
        title:
          'Refactoring leaves us with simplier code, allowing the team to work faster',
      }),
    },
  },
};
