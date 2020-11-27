import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round4ActionId = 'CROSS_SKILLING' | 'EXTERNAL_CROSS_TRAINING';

export const round4: RoundDescription<Round4ActionId> = {
  title: 'Go Live Soon',
  description: (
    <p>
      We must go live with an early version of the product this round, for a
      tradeshow. Due to your limited productivity in past rounds, management are
      prepared to offer some options to help you out. We will provide an extra
      ‘4’ points of capacity for anything that helps. Another team member?
      Overtime?
    </p>
  ),
  effect: (_, currentRound) => {
    if (currentRound === 4) {
      return {
        capacityChange: 4,
        title: 'Management is paying overtime',
      };
    }
    return null;
  },
  actions: {
    CROSS_SKILLING: {
      image: example,
      name: 'Informal Cross Skilling',
      description:
        'Informal cross-skilling for existing team members in an area the team is weak. This is often achieved through Pair Programming, Learning Time, etc (Testing anyone?)',
      cost: 4,
      effect(age) {
        let change = age;
        if (age > 3) {
          change = 3;
        }

        return {
          capacityChange: change,
        };
      },
    },
    EXTERNAL_CROSS_TRAINING: {
      image: example,
      name: 'Send Team Members on a testing course',
      description:
        'Take an outside course to improve the skills of one existing team members in an area the team is weak. (Testing anyone?)',
      cost: 3,
      effect(age) {
        let change = 0;
        if (age > 1) {
          change = 2;
        }

        return {
          capacityChange: change,
        };
      },
    },
  },
};
