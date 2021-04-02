import { Effect, VisibleEffect } from './types';

export function isEffect(e: Effect | null): e is Effect {
  return e !== null;
}

export function isVisibleEffect(e: Effect): e is VisibleEffect {
  return e.title !== false;
}
