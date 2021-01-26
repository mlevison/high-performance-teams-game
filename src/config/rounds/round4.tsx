import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round4ActionId =
  | 'CROSS_SKILLING'
  | 'EXTERNAL_CROSS_TRAINING'
  | 'PERSONAL_PRODUCTIVITY_BONUS';

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
      name: 'Informal Cross-Skilling',
      description:
        'Informal cross-skilling for existing team members in an area the team is weak. This is often achieved through Pair Programming, Learning Time, etc (Testing anyone?)',
      cost: 4,
      effect(age) {
        let change = age - 1;
        if (age > 4) {
          change = 3;
        }

        return {
          capacityChange: change,
        };
      },
    },
    EXTERNAL_CROSS_TRAINING: {
      image: example,
      name: 'Send Team Members on a Testing Course',
      description:
        'Take an outside course to improve the skills of one existing team members in an area the team is weak. (Testing anyone?)',
      cost: 3,
      effect(age) {
        let change = 0;
        if (age > 2) {
          change = 2;
        }

        return {
          capacityChange: change,
        };
      },
    },
    PERSONAL_PRODUCTIVITY_BONUS: {
      image: example,
      name: 'Personal Productivity Bonus',
      description:
        'The company will offer anyone who exceeds their performance goals an extra $5,000. A manager says team members working harder will increase the likelihood of completing features on time',
      cost: 2,
      effect(age) {
        if (age === 0) {
          return [
            {
              userStoryChange: 50,
              title:
                'Productivity Bonus helped in the short term - team members focused on individual productivity',
            },
          ];
        }
        if (age >= 2) {
          return [
            {
              capacityChange: -1,
              title:
                'Productivity Bonus helped in the short term and then the benefit waned. Along the way it harmed collaboration',
            },
          ];
        }
        return null;
      },
    },
  },
};
