import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round5ActionId = 'BYPASS_DEFINITION_OF_DONE';

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
  },
};
