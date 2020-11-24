import React from 'react';
import type { GremlinList } from '../../state';

export const gremlins: GremlinList = {
  3: {
    name: 'Management yells at a team member in public',
    description: (
      <p>
        Management yells at a team member in public for not pulling their
        weight. The team member who was yelled at feels their personal status
        was reduced. The whole team fears they will be next.&nbsp; If you have
        already implemented: Protection from Outside Distraction - this will
        eliminate the effect.
      </p>
    ),
    effect(age, finishedActionIds) {
      if (
        finishedActionIds.includes(
          'GAME_ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION',
        )
      ) {
        // TODO - Hannes are we better to return null or 0 capacity change with details on why zero?
        return null;
      }
      return {
        capacity: -2,
        title: 'Management yells at a team member in public',
      };
    },
  },
  4: {
    name: 'Emergency on other team',
    description: (
      <p>
        Your best tester is needed by another team for a while.&nbsp; If you
        have already implemented: Cross Training and Protection from Outside
        Distraction, they will reduce effects.
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
        // TODO Hannes - why does this have to be an assignment like the one I did above
        capacity,
        title:
          'We’ve had an emergency on another team, we need your best tester for a while.',
      };
    },
  },
};
