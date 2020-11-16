import React from 'react';
import { AppState, startCapacity } from '../state';
import styles from './Status.module.css';

type Props = AppState['currentRound'];

export default function Status(props: Props) {
  return (
    <>
      <h2>Capacity Breakdown</h2>
      <ul className={styles.status}>
        <li>
          <span className={styles.cap}>{startCapacity}</span> Start Capacity
        </li>
        {props.activeEffects.length !== 0 && (
          <>
            <li className={styles.title}>Active Effects</li>
            {props.activeEffects.map((effect) => (
              <li key={effect.title}>
                <span className={styles.cap}>
                  <span className={styles.sign}>
                    {effect.capacity > 0 ? '+' : '-'}
                  </span>
                  {String(effect.capacity).replace(/^-/, '')}
                </span>
                {effect.title}
              </li>
            ))}
          </>
        )}
        <li className={styles.capThisRound}>
          <span className={styles.cap}>
            <span className={styles.sign}>=</span> {props.capacity.total}
          </span>{' '}
          Capacity available this round
        </li>
        {props.selectedGameActions.length !== 0 && (
          <>
            <li className={styles.title}>Selected Actions</li>
            {props.selectedGameActions.map((gameAction) => (
              <li key={gameAction.id}>
                <span className={styles.cap}>
                  <span className={styles.sign}>-</span> {gameAction.cost}
                </span>
                {gameAction.name}
              </li>
            ))}
          </>
        )}

        <li className={styles.title}>User Stories</li>
        <li>
          <span className={styles.cap}>
            <span className={styles.sign}>-</span> {props.capacity.available}
          </span>{' '}
          spent on User Stories
        </li>
      </ul>
    </>
  );
}
