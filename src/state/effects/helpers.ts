import {
  CapacityEffect,
  Effect,
  UserStoryChanceEffect,
  VisibleEffect,
} from './types';
import { EFFECT_HIDDEN } from '../../constants';

export function isEffect(e: Effect | null): e is Effect {
  return e !== null;
}

export function isVisibleEffect<T extends Effect>(e: T): e is VisibleEffect<T> {
  return e.title !== EFFECT_HIDDEN;
}

export function isCapacityEffect<T extends Effect>(
  e: T,
): e is CapacityEffect<T> {
  return Object.getOwnPropertyNames(e).includes('capacity');
}

export function isUserStoryChanceEffect<T extends Effect>(
  e: T,
): e is UserStoryChanceEffect<T> {
  return Object.getOwnPropertyNames(e).includes('userStoryChance');
}
