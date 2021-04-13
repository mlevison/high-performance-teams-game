import React from 'react';
import cx from 'classnames';
import type { AppState, BaseEffect } from '../../state';
import EffectValue, { Sign } from './EffectValue';
import styles from './Status.module.css';

type Props = AppState['currentRound'] & {
  startCapacity: number;
};

export function ActiveEffects(props: {
  effects: AppState['currentRound']['activeEffects'];
  types?: (keyof BaseEffect)[];
  showUnit: boolean;
}) {
  return (
    <>
      {(
        props.types || ['capacityChange', 'userStoryChange', 'gremlinChange']
      ).map((type) =>
        props.effects
          .filter((effect) => effect[type] !== undefined)
          .map((effect) => {
            const value = effect[type]!;

            return (
              <li
                key={effect.title}
                className={cx(value < 0 && styles.negative)}
              >
                <span
                  className={cx(
                    !props.showUnit && styles.cap,
                    value < 0 && styles.negativeValue,
                  )}
                >
                  {props.showUnit ? (
                    <EffectValue effect={effect} />
                  ) : (
                    <Sign value={value} />
                  )}
                </span>
                {props.showUnit ? <br /> : ' '}
                {effect.title}
              </li>
            );
          }),
      )}
    </>
  );
}

export default function Status(props: Props) {
  const percentOnUserStories = props.capacity.available / props.capacity.total;
  const userStoryStatus =
    percentOnUserStories < 0.5
      ? 'CRITICAL'
      : percentOnUserStories < 0.7
      ? 'WARNING'
      : 'OK';

  const capacityEffects = props.activeEffects.filter(
    (effect) => effect.capacityChange !== undefined,
  );

  return (
    <>
      <h2>Working Capacity Breakdown</h2>
      <ul className={styles.status}>
        <li>
          <span className={styles.cap}>{props.startCapacity}</span> Start
          Capacity
        </li>
        {capacityEffects.length ? (
          <>
            <li className={styles.title}>Active Effects</li>
            <ActiveEffects
              effects={capacityEffects}
              types={['capacityChange']}
              showUnit={false}
            />
          </>
        ) : null}
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
            <span className={styles.sign}>=</span> {props.capacity.available}
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
