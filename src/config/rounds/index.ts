import type { RoundDescription } from '../../state/rounds/types';
import { round1, Round1ActionId } from './round1';
import { round2, Round2ActionId } from './round2';
import { round3, Round3ActionId } from './round3';
import { round4, Round4ActionId } from './round4';
import { round5, Round5ActionId } from './round5';
import { round6, Round6ActionId } from './round6';
import { round7, Round7ActionId } from './round7';

export type GameActionId =
  | Round1ActionId
  | Round2ActionId
  | Round3ActionId
  | Round4ActionId
  | Round5ActionId
  | Round6ActionId
  | Round7ActionId;

export const rounds: { [key: string]: RoundDescription<string> } = {
  1: round1,
  2: round2,
  3: round3,
  4: round4,
  5: round5,
  6: round6,
  7: round7,
};
