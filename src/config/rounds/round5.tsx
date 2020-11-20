import React from 'react';
import type { RoundDescription } from '../../state';

export type Round5ActionId = never;

export const round5: RoundDescription<Round5ActionId> = {
  title: "We're live and we have real Customers",
  description: (
    <p>
      Congratulations our product is live in the market. People are using it and
      they're finding bugs. We will have to do deal with those bugs this Sprint.
    </p>
  ),
  actions: {},
};
