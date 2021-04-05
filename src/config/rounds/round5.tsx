import React from 'react';
import type { RoundDescription } from './index';
import example from './images/example.jpg';

export type Round5ActionId =
  | 'BYPASS_DEFINITION_OF_DONE'
  | 'INCLUDE_STAKEHOLDERS_IN_VISION_UPDATE'
  | 'ADOPT_BDD'
  | 'WORK_WITH_PO_LIMIT_PB_SIZE'
  | 'ESTABLISH_SPRINT_GOALS'
  | 'MAKE_IMPEDIMENTS_LIST_PUBLIC';

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
      cost: 0,
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
        if (age <= 1) {
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
        <>
          <p>
            Team members collaborate before starting work on developing a User
            Story team members review and establish basic acceptance criteria.
            As they grow in skill, they often write the acceptance criteria as
            automated acceptance tests in a language that can be read by all
            members of the team.
          </p>
          <p>
            For more see:{' '}
            <a href="https://agilepainrelief.com/blog/scrummaster-tales-team-collaborate-acceptance-criteria.html">
              Scrum By Example - The Team Collaborate on Acceptance Criteria
            </a>
          </p>
        </>
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
    WORK_WITH_PO_LIMIT_PB_SIZE: {
      image: example,
      name: 'Limit the Size of the Product Backlog',
      description: (
        <>
          <p>
            The ScrumMaster works with the Product Owner to make sure the
            ProductBacklog remains a manageable size. My recommendation max 3
            months work. Items that are further away are still visible in the
            Story Map but haven't be broken done into smaller parts. They also
            work to ensure the Product Backlog is prioritized and up to date.
          </p>
          <p>
            This helps the Product Owner because it will be easier to keep track
            of important items. It helps the team because they will wasted less
            time in Product Backlog Refinement. Last it helps the stakeholders
            because we're able to give them honest forecasts.
          </p>
        </>
      ),
      cost: 1,
      effect(age) {
        if (age < 2) {
          return { capacityChange: 0 };
        }
        return {
          capacityChange: 1,
        };
      },
    },
    ESTABLISH_SPRINT_GOALS: {
      image: example,
      name: 'Establish Sprint Goals',
      available: { requires: 'BACKLOG_REFINEMENT' },
      description: (
        <>
          <p>
            Sprint Goals help the team by giving them focus in the Sprint, by
            helping the team better understand what they're trying to achieve.
            If the team is having trouble in Sprint the Goal is a refocusing
            tool.
          </p>
          <p>
            For more see:{' '}
            <a href="https://agilepainrelief.com/blog/sprint-goals-provide-purpose.html">
              Sprint Goals Provide Purpose
            </a>
          </p>
        </>
      ),
      cost: 1,
      effect(age) {
        if (age <= 1) {
          return {
            userStoryChange: 5,
          };
        }
        if (age <= 3) {
          return {
            userStoryChange: 10,
          };
        }
        return {
          userStoryChange: 15,
        };
      },
    },
    MAKE_IMPEDIMENTS_LIST_PUBLIC: {
      image: example,
      name: 'Post a List of the Teams Impediments',
      type: 'COMMUNICATION',
      description: (
        <>
          <p>
            All teams have impediments and slow downs. Good teams make them
            visible. Great teams eliminate them. In Scrum we expect the
            ScrumMaster to maintain a public list of these impediments and then
            work to resolve them.
          </p>
        </>
      ),
      cost: 1,
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
  },
};
