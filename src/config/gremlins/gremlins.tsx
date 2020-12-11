import React from 'react';
import type { GremlinList } from '../../state';

export type GremlinId =
  | 'GREMLIN_MANAGEMENT_YELLS'
  | 'GREMLIN_EMERGENCY_ON_OTHER_TEAM'
  | 'GREMLIN_NOT_PULLING_THEIR_WEIGHT'
  | 'GREMLIN_NOT_AT_DAILY_SCRUM';

export const gremlins: GremlinList<GremlinId> = {
  GREMLIN_MANAGEMENT_YELLS: {
    name: 'Management yells at a team member in public',
    probability: () => 10,
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
      if (finishedActionIds.includes('PROTECTED_FROM_OUTSIDE_DISTRACTION')) {
        // TODO - Hannes are we better to return null or 0 capacity change with details on why zero?
        return null;
      }
      return {
        // TODO - Hannes did I get this wrong? I want this effect to be permanent - even if they add the PROTECTED_FROM_OUTSIDE_DISTRACTION later
        capacityChange: -2,
        title: 'Management yells at a team member in public',
      };
    },
  },
  GREMLIN_EMERGENCY_ON_OTHER_TEAM: {
    probability: () => 10,
    name: 'Emergency on other team',
    description: (
      <p>
        Your best tester is needed by another team for a while.&nbsp; If you
        have already implemented: Cross Skilling, External Cross Training or
        Protection from Outside Distraction, they will reduce effects.
      </p>
    ),
    effect(age, finishedActionIds) {
      if (
        age >= 3 ||
        (finishedActionIds.includes('PROTECTED_FROM_OUTSIDE_DISTRACTION') &&
          age >= 2)
      ) {
        return null;
      }

      let capacity = -3;

      if (finishedActionIds.includes('CROSS_SKILLING')) {
        capacity += 1;
      }
      if (finishedActionIds.includes('EXTERNAL_CROSS_TRAINING')) {
        capacity += 1;
      }

      return {
        // TODO Hannes - why does this have to be an assignment like the one I did above
        capacityChange: capacity,
        title:
          'We’ve had an emergency on another team, we need your best tester for a while.',
      };
    },
  },
  GREMLIN_NOT_PULLING_THEIR_WEIGHT: {
    probability: () => 10,
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
        finishedActionIds.includes('ONE_ON_ONES') ||
        finishedActionIds.includes('CROSS_SKILLING')
      ) {
        capacityChange = -1;
      }
      return {
        capacityChange: capacityChange,
        title: "Team member isn't pulling their weight",
      };
    },
  },
  GREMLIN_NOT_AT_DAILY_SCRUM: {
    probability: () => 10,
    name: 'Team Member consistently late or misses Daily Scrum',
    description: (
      <p>
        When one team member is consistently late or worse missing, they signal
        disrespect to their team. Other team members are annoyed that this
        person feels that them. &nbsp; ScrumMaster conducts one on ones - you
        will become aware of the problem early; Working Agreements - because
        they empower team members to raise the issue.
      </p>
    ),
    effect(age, finishedActionIds) {
      let capacityChange = -1;
      if (
        finishedActionIds.includes('ONE_ON_ONES') ||
        finishedActionIds.includes('WORKING_AGREEMENTS')
      ) {
        capacityChange = 0;
      }
      return {
        capacityChange: capacityChange,
        title: 'Team Member consistently late or misses Daily Scrum',
      };
    },
  },
};
