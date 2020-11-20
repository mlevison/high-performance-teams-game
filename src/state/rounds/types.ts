import { ReactNode } from 'react';
import { GameActionList } from '../gameActions/types';
import { Effect } from '../effects/types';
import { ClosedRound } from '../round';

export type RoundDescription<T extends string> = {
  description: ReactNode;
  title: string;
  actions: GameActionList<T>;
  effect?: (previousRounds: ClosedRound[]) => Effect | null;
};
