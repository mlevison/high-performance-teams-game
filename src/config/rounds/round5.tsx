import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round5ActionId =
  | 'BYPASS_DEFINITION_OF_DONE'
  | 'INCLUDE_STAKEHOLDERS_IN_VISION_UPDATE'
  | 'ADOPT_BDD';

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
    ADOPT_BDD: {
      image: example,
      name: 'Adopt Behaviour Driven Development',
      description: (
        <p>
          Team members collaborate before starting work on developing a User
          Story team members review and establish basic acceptance criteria. As
          they grow in skill, they often write the acceptance criteria as
          automated acceptance tests in a language that can be read by all
          members of the team.
          <br>
            <br></br>
          </br>
          For more see:{' '}
          <a href="https://agilepainrelief.com/blog/scrummaster-tales-team-collaborate-acceptance-criteria.html">
            Scrum By Example - The Team Collaborate on Acceptance Criteria
          </a>
        </p>
      ),
      cost: 2,
      effect(age) {
        if (age <= 2) {
          return {
            title:
              'Improving Collaboration slows the team at first. Even from the start it improves quality and completition of User Stories',
            capacityChange: -1,
            userStoryChange: 10,
          };
        }
        if (age === 3 || age === 4) {
          return {
            capacityChange: 0,
            userStoryChange: 15,
          };
        }
        return {
          capacityChange: 1,
          userStoryChange: 20,
        };
      },
    },
  },
};
