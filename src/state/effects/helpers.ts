import {
  CapacityEffect,
  CAPACITY_CHANGE_KEY,
  Effect,
  GremlinChanceEffect,
  GREMLIN_CHANGE_KEY,
  UserStoryChanceEffect,
  USER_STORY_CHANGE_KEY,
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
  return Object.getOwnPropertyNames(e).includes(CAPACITY_CHANGE_KEY);
}

export function isUserStoryChanceEffect<T extends Effect>(
  e: T,
): e is UserStoryChanceEffect<T> {
  return Object.getOwnPropertyNames(e).includes(USER_STORY_CHANGE_KEY);
}

export function isGremlinChanceEffect<T extends Effect>(
  e: T,
): e is GremlinChanceEffect<T> {
  return Object.getOwnPropertyNames(e).includes(GREMLIN_CHANGE_KEY);
}

export function isUserStoryOrGremlinChanceEffect<T extends Effect>(
  effect: T,
): effect is UserStoryChanceEffect<T> | GremlinChanceEffect<T> {
  return isUserStoryChanceEffect(effect) || isGremlinChanceEffect(effect);
}
