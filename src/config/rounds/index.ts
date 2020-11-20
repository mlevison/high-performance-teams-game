import type { RoundDescription } from '../../state/rounds/types';
import { round1, Round1ActionId } from './round1';
import { round2, Round2ActionId } from './round2';
import { round3, Round3ActionId } from './round3';
import { round4, Round4ActionId } from './round4';
import { round5, Round5ActionId } from './round5';

export type GameActionId =
  | Round1ActionId
  | Round2ActionId
  | Round3ActionId
  | Round4ActionId
  | Round5ActionId;

export const rounds: { [key: string]: RoundDescription<string> } = {
  1: round1,
  2: round2,
  3: round3,
  4: round4,
  5: round5,
};
