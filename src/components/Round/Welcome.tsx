import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { AppState } from '../../state';
import Button from '../Button';
import EffectValue from '../EffectValue';
import styles from './Round.module.css';
import { View } from './types';

type Props = {
  children: ReactNode;
  gremlin: AppState['currentRound']['gremlin'];
  setView: Dispatch<SetStateAction<View>>;
};
export default function Welcome(props: Props) {
  return (
    <>
      {props.children}
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
        <Button primary onClick={() => props.setView('actions')}>
          Start Round
        </Button>
      </div>
    </>
  );
}
