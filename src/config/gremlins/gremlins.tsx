import React from 'react';
import type { GremlinList } from '../../state';

export const gremlins: GremlinList = {
  4: {
    name: 'Emergency on other team',
    description: (
      <p>
        TODO description: Your best tester is needed by another team for a
        while. Cross training and protection from outside distraction will
        reduce effects
      </p>
    ),
    effect(age, finishedActionIds) {
      if (
        age >= 3 ||
        (finishedActionIds.includes(
          'GAME_ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION',
        ) &&
          age >= 2)
      ) {
        return null;
      }

      let capacity = -3;

      if (finishedActionIds.includes('GAME_ACTION_INFORMAL_CROSS_TRAINING')) {
        capacity += 1;
      }
      if (finishedActionIds.includes('GAME_ACTION_FORMAL_CROSS_TRAINING')) {
        capacity += 1;
      }

      return {
        capacity,
        title:
          'We’ve had an emergency on another team, we need your best tester for a while.',
      };
    },
  },
};
