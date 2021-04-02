import { ReactNode } from 'react';
import { GameActionList } from '../gameActions/types';
import { Effect } from '../effects/types';
import { GameRound } from '../round';

export type RoundDescription = {
  description: ReactNode;
  title: string;
  actions: GameActionList;
  effect?: (
    previousRounds: GameRound[],
    currentRound: number,
  ) => Effect | Effect[] | null;
};
