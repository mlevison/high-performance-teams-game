import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round6ActionId = 'IMPROVE_FORECASTING';

export const round6: RoundDescription<Round6ActionId> = {
  title: 'Go Live Soon',
  description: (
    <p>
      We must go live with an early version of the product this round, for a
      tradeshow. Due to your limited productivity in past rounds, management are
      prepared to offer some options to help you out. We will provide an extra
      ‘4’ points of capacity for anything that helps. Another team member?
      Overtime?
    </p>
  ),
  effect: (_, currentRound) => {
    if (currentRound === 6) {
      return {
        capacityChange: 4,
        title: 'Management is paying overtime',
      };
    }
    return null;
  },
  actions: {
    IMPROVE_FORECASTING: {
      image: example,
      name: 'Improve Forecasting',
      description: <p>Blah Blah</p>,
      cost: 0,
      effect: () => ({
        capacityChange: 0,
        title: '',
      }),
    },
  },
};
