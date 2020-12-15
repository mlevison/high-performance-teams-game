import { ReactNode } from 'react';
import { GameActionList } from '../gameActions/types';
import { Effect } from '../effects/types';
import { GameRound } from '../round';

export type RoundDescription<T extends string> = {
  description: ReactNode;
  title: string;
  actions: GameActionList<T>;
  effect?: (
    previousRounds: GameRound[],
    currentRound: number,
  ) => Effect | Effect[] | null;
};
