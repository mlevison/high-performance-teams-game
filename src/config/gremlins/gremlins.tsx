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
  5: {
    name: "Team member isn't pulling their weight",
    description: (
      <p>
        One of the people on your team isn’t pulling their weight - not even
        close. However, nothing seems to get done about it. The rest of the team
        is pulling together and taking this person’s work on, but it’s harming
        morale and productivity. &nbsp; If you have already implemented: A
        ScrumMaster conducts one on ones - you will be working on the problem
        already; Cross Skilling - the problem person is more likely to grow
        because they see others and learn from them.
      </p>
    ),
    effect(age, finishedActionIds) {
      let capacityChange = -2;
      if (
        finishedActionIds.includes('GAME_ACTION_ONE_ON_ONES') ||
        finishedActionIds.includes('GAME_ACTION_INFORMAL_CROSS_TRAINING')
      ) {
        capacityChange = -1;
      }
      return {
        capacity: capacityChange,
        title: "Team member isn't pulling their weight",
      };
    },
  },
};
