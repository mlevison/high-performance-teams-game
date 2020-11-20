import { Effect, VisibleEffect } from './types';
import { EFFECT_HIDDEN } from '../../constants';

export function isEffect(e: Effect | null): e is Effect {
  return e !== null;
}

export function isVisibleEffect(e: Effect): e is VisibleEffect {
  return e.title !== EFFECT_HIDDEN;
}
