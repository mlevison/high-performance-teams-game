import React from 'react';
import type { RoundDescription } from '../../state';

export type Round7ActionId = never;

export const round7: RoundDescription<Round7ActionId> = {
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
