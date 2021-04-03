import React, { ReactNode } from 'react';
import type { AppState } from '../../../state';
import EffectValue from '../EffectValue';
import styles from './Round.module.css';

export type Props = {
  children: ReactNode;
  gremlin: AppState['currentRound']['gremlin'];
};
export default function RoundDescription(props: Props) {
  return (
    <>
      {props.children ? (
        <div className={styles.description}>{props.children}</div>
      ) : null}
      {props.gremlin && (
        <>
          <h3>Gremlin</h3>
          Just happened:&nbsp;
          <strong>⚠️ {props.gremlin.name}</strong>
          {props.gremlin.description}
          <ul className={styles.gremlinEffects}>
            {props.gremlin.effect.map((effect) => (
              <li key={effect.title}>
                <EffectValue effect={effect} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
