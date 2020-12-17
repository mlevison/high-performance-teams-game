import React from 'react';
import { VisibleEffect } from '../state';
import styles from './EffectValue.module.css';

type Props = {
  effect: VisibleEffect;
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
  return (
    <>
      {props.effect.capacityChange !== undefined && (
        <>
          <Sign value={props.effect.capacityChange} /> Capacity
        </>
      )}
      {props.effect.gremlinChange !== undefined && (
        <>
          <Sign value={props.effect.gremlinChange} unit="%" /> Chance of
          Gremlins occurring
        </>
      )}
      {props.effect.userStoryChange !== undefined && (
        <>
          <Sign value={props.effect.userStoryChange} unit="%" /> Chance of User
          Stories succeeding
        </>
      )}
    </>
  );
}
