import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round5ActionId = never; //'BYPASS_DEFINITION_OF_DONE';

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
    //   BYPASS_DEFINITION_OF_DONE: {
    //     image: example,
    //     name: 'Bypass the Definition of Done',
    //     description: (
    //       <p>
    //         Skipping elements in the Definition of Done will allow us to go faster.
    //       </p>
    //     ),
    //     cost: 1,
    //     effect(age) {
    //       let change = age - 1;
    //       if (age > 4) {
    //         change = 3;
    //       }
    //       return {
    //         capacityChange: change,
    //       };
    //     },
    //   },
  },
};
