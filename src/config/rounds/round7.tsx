import React from 'react';
import type { GameActionId } from './index';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round7ActionId =
  | 'PREALLOCATE_CAPACITY_FOR_PRODUCTION_SUPPORT'
  | 'ONE_PERSON_DEALS_WITH_DEFECTS';

export const round7: RoundDescription<Round7ActionId, GameActionId> = {
  title: "We're Live and We Have Real Customers",
  description: (
    <p>
      Congratulations, our product is live in the market. People are using it
      and they're finding bugs. We will have to go deal with those bugs this
      Sprint.
    </p>
  ),
  actions: {
    ONE_PERSON_DEALS_WITH_DEFECTS: {
      image: example,
      name: 'One Person Deals with Defects',
      description: (
        <>
          <p>
            In Sprint Planning one person volunteers to run point for production
            support issues
          </p>
          <p>
            For examples and depth see:{' '}
            <a href="https://agilepainrelief.com/blog/scrum-production-support.html">
              Scrum by Example – How to Handle Production Support Issues in
              Scrum
            </a>
          </p>
        </>
      ),
      cost: 3,
    },
    PREALLOCATE_CAPACITY_FOR_PRODUCTION_SUPPORT: {
      image: example,
      name: 'Allocate Capacity for bugs',
      description: (
        <>
          <p>
            In Sprint Planning allocate up to 20% of the teams time to deal with
            production support issues
          </p>
          <p>
            For examples and depth see:{' '}
            <a href="https://agilepainrelief.com/blog/scrum-production-support.html">
              Scrum by Example – How to Handle Production Support Issues in
              Scrum
            </a>
          </p>
        </>
      ),
      cost: 3,
    },
  },
};
