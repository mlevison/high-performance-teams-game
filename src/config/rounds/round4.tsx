import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round4ActionId =
  | 'CROSS_SKILLING'
  | 'EXTERNAL_CROSS_TRAINING'
  | 'PERSONAL_PRODUCTIVITY_BONUS'
  | 'NEW_TESTER'
  | 'BA_QA_DEV_COLLABORATION';

export const round4: RoundDescription<Round4ActionId> = {
  title: 'Team is Bottlenecked',
  description: (
    <p>
      The team is suffering, their work is queueing up in front the tester.
      Imploring them to work faster is failing.
    </p>
  ),
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
    NEW_TESTER: {
      image: example,
      name: 'Hiring a new Tester',
      description:
        'Hire a new Tester for the team. This person will reduce the load on your existing tester and speed things up eventually.',
      cost: 2,
      effect(age) {
        if (age <= 2) {
          return {
            title:
              'Hiring a new person and bringing them up to speed slows the team down and damages existing Team member relationships',
            capacityChange: -age,
          };
        }
        if (age === 3) {
          return {
            title: 'Eventually the new person starts fit in',
            capacityChange: -1,
          };
        }
        let resultDesc = 'Finally the new person helps';
        if (age === 4) {
          return {
            title: resultDesc,
            capacityChange: 1,
          };
        }
        return {
          title: resultDesc,
          capacityChange: 2,
        };
      },
    },
    BA_QA_DEV_COLLABORATION: {
      image: example,
      name: 'BA, Development, Testing Collaboration',
      description: 'Work with team members to collaborate ',
      cost: 2,
      effect(age) {
        let userStoryImprovement = 15;
        if (age <= 2) {
          return {
            title:
              'Improving Collaboration slows the team at first. Even from the start it improves quality and completition of User Stories',
            capacityChange: -1,
            userStoryChange: userStoryImprovement,
          };
        }
        if (age === 3) {
          return {
            capacityChange: 0,
            userStoryChange: userStoryImprovement,
          };
        }
        return {
          capacityChange: 1,
          userStoryChange: userStoryImprovement,
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
