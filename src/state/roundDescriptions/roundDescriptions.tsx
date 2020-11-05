import React, { ReactElement } from 'react';
import { Effect, EFFECT_HIDDEN } from '../effects';
import { ClosedRound } from '../round';

export type RoundDescription = {
  description: ReactElement;
  effect?: (
    roundNumber: number,
    previousRounds: ClosedRound[],
  ) => Effect | null;
};

/* Rounds are 1-indexed - 1 is the first round */
export const roundDescriptions: { [key: string]: RoundDescription } = {
  1: {
    description: (
      <>
        <h2>Team, welcome to the World’s Smallest Online Bookstore</h2>
        <p>
          We hired you because you’re the best individuals in your respective
          areas. Please remember that we’re Vulture Capital funded and we have
          only a few months runway, so you must deliver. This first Sprint, the
          company really needs you to prove that you can deliver a working …
        </p>
      </>
    ),
    effect: () => ({ capacity: 10, title: EFFECT_HIDDEN }),
  },
  3: {
    description: (
      <>
        <h2>
          We must go live with an early version of the product this round, for
          CES
        </h2>
        <p>
          Due to your limited productivity in past rounds, management are
          prepared to offer some options to help you out. We will pay an extra
          ‘4’ points for anything that helps. Another team member? Overtime?
        </p>
      </>
    ),
    effect: (roundNumber) => {
      if (roundNumber === 3) {
        return { capacity: 4, title: 'Management is paying overtime' };
      }
      return null;
    },
  },
};
