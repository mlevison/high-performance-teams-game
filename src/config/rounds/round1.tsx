import React from 'react';
import type { RoundDescription } from '../../state';
import { EFFECT_HIDDEN } from '../../constants';
import example from './images/example.jpg';

export type Round1ActionId =
  | 'ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION'
  | 'ACTION_CLARIFY_PRODUCT_VISION'
  | 'ACTION_WORKING_AGREEMENTS'
  | 'ACTION_BUILD_SERVER'
  | 'ACTION_TEAMS_ON_SAME_FLOOR';

export const round1: RoundDescription<Round1ActionId> = {
  title: 'Team, welcome to the World’s Smallest Online Bookstore',
  description: (
    <p>
      We hired you because you’re the best individuals in your respective areas.
      Please remember that we’re Vulture Capital funded and we have only a few
      months runway, so you must deliver. This first Sprint, the company really
      needs you to prove that you can deliver a working …
    </p>
  ),
  effect: () => ({ capacityChange: 10, title: EFFECT_HIDDEN }),
  actions: {
    ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION: {
      image: 'https://placekitten.com/100/100',
      name: 'Protected from Outside Distraction',
      description: (
        <p>
          ScrumMaster protects the team from outside distraction. Example: A
          manager asking a team member to do them a small favour as it will only
          take an hour.
        </p>
      ),
      cost: 1,
      effect: () => ({ userStoryChance: 10 }),
    },
    ACTION_CLARIFY_PRODUCT_VISION: {
      image: 'https://placekitten.com/100/100',
      name: 'Clarify Product Vision',
      description: (
        <p>
          PO and Development Team collaborate on understanding Product Vision
          using an exercise like Product Box. Teams that aren’t involved in the
          creation of their product vision are doomed to build Product that
          neither PO, Customers nor Stakeholders want.
        </p>
      ),
      cost: 2,
      effect: () => ({ userStoryChance: 15 }),
    },

    ACTION_WORKING_AGREEMENTS: {
      image: example,
      type: 'COMMUNICATION',
      name: 'Working Agreements',
      description: (
        <p>
          Working Agreements are a simple, powerful way of creating explicit
          guidelines for what kind of work culture you want for your Team. They
          are a reminder for everyone about how they can commit to respectful
          behaviour and communication
        </p>
      ),
      cost: 1,
      effect: () => ({ capacityChange: 1 }),
    },
    ACTION_BUILD_SERVER: {
      image: example,
      type: 'ENGINEERING',
      name: 'Build Server',
      description: (
        <p>
          Setup Build Server and Continuous Integration. This is required to
          make future engineering improvements
        </p>
      ),
      cost: 2,
    },
    ACTION_TEAMS_ON_SAME_FLOOR: {
      image: example,
      name: 'Team Members On SameFloor',
      type: 'COMMUNICATION',
      description:
        "Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions",
      cost: 3,
      /* don't use arrow function in order to have "this" bound to action */
      effect(age) {
        if (age < 5) {
          return {
            capacityChange: age + 1,
            title: `${this.name} active since ${age + 1} rounds`,
          };
        }

        return {
          capacityChange: 5,
          title: `${this.name} active since 5 or more rounds`,
        };
      },
    },
  },
};
