import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round6ActionId =
  | 'IMPROVE_FORECASTING'
  | 'SPRINT_BACKLOG_IMPROVEMENT';

export const round6: RoundDescription<Round6ActionId> = {
  title: 'Go Live Soon',
  description: (
    <p>
      We must go live with an early version of the product at the end of this
      round. Due to your limited productivity in past rounds, management are
      prepared to offer some options to help you out. We will provide an extra
      ‘4’ points of capacity for anything that helps. Overtime?
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
      description: (
        <p>Switch from a simple velocity model to probablistic forecasts.</p>
      ),
      cost: 1,
    },
    SPRINT_BACKLOG_IMPROVEMENT: {
      image: example,
      name: 'Improve Sprint Backlog',
      description: <p>Teams that take ownership of their Sprint Backlog</p>,
      cost: 1,
      effect(age) {
        if (age < 2) {
          return { capacityChange: 0, userStoryChange: 0 };
        }
        return {
          capacityChange: 1,
          userStoryChange: 5,
        };
      },
    },
  },
};
