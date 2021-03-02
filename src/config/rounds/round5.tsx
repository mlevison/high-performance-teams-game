import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round5ActionId =
  | 'BYPASS_DEFINITION_OF_DONE'
  | 'INCLUDE_STAKEHOLDERS_IN_VISION_UPDATE';

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
  },
};
