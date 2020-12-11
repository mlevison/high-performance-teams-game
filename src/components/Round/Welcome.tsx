import React, { ReactNode } from 'react';
import { AppState, GameDispatch } from '../../state';
import Button from '../Button';
import EffectValue from '../EffectValue';
import styles from './Round.module.css';

type Props = {
  children: ReactNode;
  gremlin: AppState['currentRound']['gremlin'];
  dispatch: GameDispatch;
};
export default function Welcome(props: Props) {
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
      <div className={styles.center}>
        <Button
          primary
          onClick={() =>
            props.dispatch({ type: 'SET_UI_VIEW_ACTION', payload: 'actions' })
          }
        >
          Start Round
        </Button>
      </div>
    </>
  );
}
