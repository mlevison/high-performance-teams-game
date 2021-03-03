import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round5ActionId =
  | 'BYPASS_DEFINITION_OF_DONE'
  | 'INCLUDE_STAKEHOLDERS_IN_VISION_UPDATE'
  | 'LIMIT_WIP';

export const round5: RoundDescription<Round5ActionId> = {
  title: 'Nearly There',
  description: (
    <p>
      We're so close to the end. Be aware our stakeholders are unhappy, they
      don't see you working hard enough. Please cut corners, we need to be ready
      for launch.
    </p>
  ),
  actions: {
    BYPASS_DEFINITION_OF_DONE: {
      image: example,
      name: 'Bypass the Definition of Done',
      description: (
        <p>
          Skipping elements in the Definition of Done will allow us to go
          faster.
        </p>
      ),
      cost: 1,
      effect(age) {
        if (age === 1) {
          return { capacityChange: 2 };
        }
        return {
          capacityChange: 0,
          userStoryChange: -10,
        };
      },
    },
    INCLUDE_STAKEHOLDERS_IN_VISION_UPDATE: {
      image: example,
      name: 'Include Stakeholders in updating Vision',
      description: (
        <p>
          When we include our stakeholders (end users and customers etc) in
          building our Product Vision and Strategy it makes it more likely, that
          our product will meet their needs.
        </p>
      ),
      cost: 1,
      effect(age) {
        if (age === 1) {
          return { userStoryChange: 0 };
        }
        return {
          userStoryChange: 10,
        };
      },
    },
    LIMIT_WIP: {
      image: example,
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
        console.log('WIP Limit age', age, 'and change ', change);
        if (age > 4) {
          change = 3;
        }
        return {
          capacityChange: change,
        };
      },
    },
  },
};
