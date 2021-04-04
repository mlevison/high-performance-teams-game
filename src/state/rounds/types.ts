import { ReactNode } from 'react';
import { GameActionList } from '../gameActions/types';
import { Effect } from '../effects/types';
import { GameRound } from '../round';

export type RoundDescription<
  RoundActionId extends string,
  GameActionId extends string
> = {
  description: ReactNode;
  title: string;
  actions: GameActionList<RoundActionId, GameActionId>;
  effect?: (
    previousRounds: GameRound<GameActionId>[],
    currentRound: number,
  ) => Effect | Effect[] | null;
};
