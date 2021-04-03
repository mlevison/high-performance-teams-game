import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export const round1: RoundDescription = {
  title: 'Team, welcome to the World’s Smallest Online Bookstore',
  description: (
    <p>
      We hired you because you’re the best individuals in your respective areas.
      Please remember that we’re Vulture Capital funded and we have only a few
      months runway, so you must deliver. This first Sprint, the company really
      needs you to prove that you can deliver a working Bookstore soon.
    </p>
  ),
  effect: () => ({
    title: false,
    capacityChange: 10,
    userStoryChange: 30,
    gremlinChange: 0,
  }),
  actions: {
    PROTECTED_FROM_OUTSIDE_DISTRACTION: {
      image: 'https://placekitten.com/100/100',
      name: 'Protected from Outside Distraction',
      description: (
        <>
          <p>
            ScrumMaster protects the team from outside distraction. Example: a
            manager asking a team member to do them a small favour as it will
            only take an hour.
          </p>
          <p>
            For a deeper understanding see:{' '}
            <a href="https://agilepainrelief.com/blog/scrum-master-tales-more-interruptions.html">
              Scrum By Example – Interruptions Hurt the Team
            </a>{' '}
            and Agile Glossary and Reference Library:{' '}
            <a href="https://agilepainrelief.com/glossary/interruptions">
              Interruptions
            </a>
          </p>
        </>
      ),
      cost: 1,
      effect: () => ({ userStoryChange: 10 }),
    },
    CLARIFY_PRODUCT_VISION: {
      image: 'https://placekitten.com/100/100',
      name: 'Clarify Product Vision',
      description: (
        <>
          <p>
            Product Owner and Development Team collaborate on understanding
            Product Vision using an exercise like Product Box. Teams that aren’t
            involved in the creation of their product vision are doomed to build
            Product that neither Product Owner, Customers, nor Stakeholders
            want.
          </p>
          <p>
            For a deeper understanding see Agile Glossary and Reference Library:{' '}
            <a href="https://agilepainrelief.com/glossary/vision">Vision</a>
          </p>
        </>
      ),
      cost: 2,
      effect: () => ({ userStoryChange: 10 }),
    },

    WORKING_AGREEMENTS: {
      image: example,
      type: 'COMMUNICATION',
      name: 'Working Agreements',
      description: (
        <>
          <p>
            Working Agreements are a simple, powerful way of creating explicit
            guidelines for what kind of work culture you want for your Team.
            They are a reminder for everyone about how they can commit to
            respectful behaviour and communication.
          </p>
          <p>
            For a deeper understanding see
            <a href="https://agilepainrelief.com/blog/team-friction-inspires-working-agreements.html">
              Scrum by Example – Team Friction Inspires Working Agreements
            </a>{' '}
            Agile Glossary and Reference Library:{' '}
            <a href="https://agilepainrelief.com/glossary/working-agreements">
              Working Agreement
            </a>
          </p>
        </>
      ),
      cost: 1,
      effect: () => ({ capacityChange: 1 }),
    },
    BUILD_SERVER: {
      image: example,
      type: 'ENGINEERING',
      name: 'Build Server',
      description: (
        <>
          <p>
            Setup Build Server and Continuous Integration. This is required to
            make future engineering improvements.
          </p>
          <p>
            For a deeper understanding see Agile Glossary and Reference Library:{' '}
            <a href="https://agilepainrelief.com/glossary/continuous-integration">
              Continuous Integration
            </a>
          </p>
        </>
      ),
      cost: 2,
    },
    TEAMS_ON_SAME_FLOOR: {
      image: example,
      name: 'Team Members on Same Floor',
      type: 'COMMUNICATION',
      description:
        "Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions.",
      cost: 3,
      /* don't use arrow function in order to have "this" bound to action */
      effect(age) {
        if (age < 6) {
          return {
            capacityChange: age,
            title: `${this.name} active since ${age + 1} rounds`,
          };
        }

        return {
          capacityChange: 5,
          title: `${this.name} active since 5 or more rounds`,
        };
      },
    },
  },
};
