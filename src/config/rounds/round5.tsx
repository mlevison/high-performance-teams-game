import React from 'react';
import type { RoundDescription } from '../../state';

export type Round5ActionId = never;

export const round5: RoundDescription<Round5ActionId> = {
  title: "We're Live and We Have Real Customers",
  description: (
    <p>
      Congratulations, our product is live in the market. People are using it
      and they're finding bugs. We will have to go deal with those bugs this
      Sprint.
    </p>
  ),
  actions: {},
};
