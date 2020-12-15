import React from 'react';
import { VisibleEffect, BaseEffect, isCapacityEffect } from '../state';
import {
  isGremlinChanceEffect,
  isUserStoryChanceEffect,
} from '../state/effects';
import styles from './EffectValue.module.css';

type Props = {
  effect: VisibleEffect<BaseEffect>;
};

export function Sign(props: { value: number; unit?: string }) {
  return (
    <span className={styles.value}>
      {props.value > 0 ? '+' : '-'}
      {String(props.value).replace(/^-/, '')}
      {props.unit}
    </span>
  );
}

export default function EffectValue(props: Props) {
  if (isCapacityEffect(props.effect)) {
    return (
      <>
        <Sign value={props.effect.capacityChange} /> Capacity
      </>
    );
  }

  if (isGremlinChanceEffect(props.effect)) {
    return (
      <>
        <Sign value={props.effect.gremlinChange} unit="%" /> Chance of Gremlins
        occurring
      </>
    );
  }

  if (isUserStoryChanceEffect(props.effect)) {
    return (
      <>
        <Sign value={props.effect.userStoryChange} unit="%" /> Chance of User
        Stories succeeding
      </>
    );
  }

  return null;
}
