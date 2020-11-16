import React, { ReactElement } from 'react';
import { Effect, EFFECT_HIDDEN } from '../effects';
import { ClosedRound } from '../round';

export type RoundDescription = {
  description: ReactElement;
  title: string;
  effect?: (previousRounds: ClosedRound[]) => Effect | null;
};

/* Rounds are 1-indexed - 1 is the first round */
export const roundDescriptions: { [key: string]: RoundDescription } = {
  1: {
    title: 'Team, welcome to the World’s Smallest Online Bookstore',
    description: (
      <p>
        We hired you because you’re the best individuals in your respective
        areas. Please remember that we’re Vulture Capital funded and we have
        only a few months runway, so you must deliver. This first Sprint, the
        company really needs you to prove that you can deliver a working …
      </p>
    ),
    effect: () => ({ capacity: 10, title: EFFECT_HIDDEN }),
  },
  2: {
    title: 'Failed Expectations',
    description: (<p>
        Your team didn't met our expectations that you would complete 10 User Stories in the last round. Our vulture capitalists are becoming concerned and ask if you can really deliver?
    </p>
    )
  },
  3: {
    title: 'Work Harder',
    description: (<p>
        Things are slowly improving. You are getting better. *Please* work harder in the next Sprint.
    </p>
    )
  },
  4: {
    title:
      'Go Live Soon',
    description: (
      <p>
        We must go live with an early version of the product this round, for a tradeshow. Due to your limited productivity in past rounds, management are prepared to offer some options to help you out. We will provide an extra ‘4’ points of capacity for anything that helps. Another team member? Overtime?
      </p>
    ),
    effect: () => ({
      capacity: 4,
      title: 'Management is paying overtime',
    }),
  },
  5: {
    title: 'We\'re live and we have real Customers',
    description: (<p>
        Congratulations our product is live in the market. People are using it and they're finding bugs. We will have to do deal with those bugs this Sprint.
    </p>
    )
  },
};
