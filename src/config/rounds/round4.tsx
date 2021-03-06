import React from 'react';
import type { RoundDescription } from './index';

export type Round4ActionId =
  | 'CROSS_SKILLING'
  | 'EXTERNAL_CROSS_TRAINING'
  | 'PERSONAL_PRODUCTIVITY_BONUS'
  | 'NEW_TESTER'
  | 'TEST_DRIVEN_DEVELOPMENT'
  | 'LIMIT_WIP';

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
      image: '/images/example.jpg',
      name: 'Informal Cross-Skilling',
      description: (
        <>
          <p>
            Informal cross-skilling for existing team members in an area the
            team is weak. This is often achieved through Pair Programming,
            Learning Time, etc (Testing anyone?)
          </p>
          <p>
            For a deeper understanding see:{' '}
            <a href="https://agilepainrelief.com/blog/how-to-cross-skill-and-grow-t-shaped-team-members.html">
              How to Cross-Skill and Grow T-shaped Team Members
            </a>
          </p>
        </>
      ),
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
      image: '/images/example.jpg',
      name: 'Send Team Members on a Testing Course',
      description: (
        <p>
          Take an outside course to improve the skills of one existing team
          members in an area the team is weak. (Testing anyone?)
        </p>
      ),
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
      image: '/images/example.jpg',
      name: 'Hiring a new Tester',
      description: (
        <p>
          Hire a new Tester for the team. This person will reduce the load on
          your existing tester and speed things up eventually.'
        </p>
      ),
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
    LIMIT_WIP: {
      image: '/images/example.jpg',
      name: 'Limit Work In Progress',
      description: (
        <p>
          Too many teams start their Sprint with each team member grabbing their
          own User Story Card. So with a team of 6 people there are now 6 items
          in progress. The challenge is that no one team member can complete
          their work independantly from the others. As result there will be work
          that was started at the beginning of the Sprint, that is incomplete at
          the end. The more work in progress, the less work gets done. Kanban
          has a saying for this: "Stop Starting and Start Finishing". In
          practice this means Limiting Work in Progress.
        </p>
      ),
      cost: 2,
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
    TEST_DRIVEN_DEVELOPMENT: {
      image: '/images/example.jpg',
      type: 'ENGINEERING',
      name: 'Test Driven Development',
      available: { requires: 'REFACTORING' },
      description: (
        <p>
          Writing Unit-level Tests before writing the code. TDD helps the
          quality by ensuring the developer understands what they're attempting
          to build before they build it. As a side effect, it reduces the volume
          of code and its complexity, thereby reducing the number of defects.
          This skill takes time to learn.
        </p>
      ),
      cost: 3,
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
    PERSONAL_PRODUCTIVITY_BONUS: {
      image: '/images/example.jpg',
      name: 'Personal Productivity Bonus',
      description: (
        <p>
          The company will offer anyone who exceeds their performance goals an
          extra $5,000. A manager says team members working harder will increase
          the likelihood of completing features on time
        </p>
      ),
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
