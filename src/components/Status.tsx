import React from 'react';
import cx from 'classnames';
import { AppState, startCapacity, isCapacityEffect } from '../state';
import styles from './Status.module.css';

type Props = AppState['currentRound'];

export default function Status(props: Props) {
  const percentOnUserStories = props.capacity.available / props.capacity.total;
  const userStoryStatus =
    percentOnUserStories < 0.5
      ? 'CRITICAL'
      : percentOnUserStories < 0.7
      ? 'WARNING'
      : 'OK';
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
            {props.activeEffects.filter(isCapacityEffect).map((effect) => (
              <li key={effect.title}>
                <span className={styles.cap}>
                  <span className={styles.sign}>
                    {effect.capacityChange > 0 ? '+' : '-'}
                  </span>
                  {String(effect.capacityChange).replace(/^-/, '')}
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
        <li
          className={cx(
            userStoryStatus === 'WARNING' && styles.userStoryWarning,
            userStoryStatus === 'CRITICAL' && styles.userStoryCritical,
          )}
        >
          <span className={styles.cap}>
            <span className={styles.sign}>-</span> {props.capacity.available}
          </span>{' '}
          spent on User Stories
        </li>
        <li className={styles.title}>
          {userStoryStatus === 'WARNING' && (
            <>🧑‍💼: "feature work needs more priority"</>
          )}
          {userStoryStatus === 'CRITICAL' && (
            <>🧑‍💼: "not enough time spent on feature work"</>
          )}
        </li>
      </ul>
    </>
  );
}
