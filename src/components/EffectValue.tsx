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

function Sign(props: { value: number }) {
  return (
    <span className={styles.value}>
      {props.value > 0 ? '+' : '-'}
      {String(props.value).replace(/^-/, '')}
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
        <Sign value={props.effect.gremlinChange} /> Chance of Gremlins occurring
      </>
    );
  }

  if (isUserStoryChanceEffect(props.effect)) {
    return (
      <>
        <Sign value={props.effect.userStoryChange} /> Chance of User Stories
        succeeding
      </>
    );
  }

  return null;
}
