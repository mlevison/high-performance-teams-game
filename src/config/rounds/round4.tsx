import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round4ActionId =
  | 'GAME_ACTION_INFORMAL_CROSS_TRAINING'
  | 'GAME_ACTION_FORMAL_CROSS_TRAINING';

export const round4: RoundDescription<Round4ActionId> = {
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
  effect: () => ({
    capacity: 4,
    title: 'Management is paying overtime',
  }),
  actions: {
    GAME_ACTION_INFORMAL_CROSS_TRAINING: {
      image: example,
      name: 'Informal Cross Training',
      description:
        'Informal cross-training for existing team members in an area the team is weak. (Testing anyone?)',
      cost: 1,
      effect: () => ({
        capacity: 1,
      }),
    },
    GAME_ACTION_FORMAL_CROSS_TRAINING: {
      image: example,
      name: 'Formal Cross-Training',
      description:
        'Formal cross-training for existing team members in an area the team is weak. (Testing anyone?)',
      cost: 3,
      effect: () => ({
        capacity: 3,
      }),
    },
  },
};
