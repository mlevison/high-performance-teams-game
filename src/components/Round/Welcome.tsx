import { TOTAL_ROUNDS } from '../../constants';
import React, { ReactNode } from 'react';
import { AppState, GameDispatch } from '../../state';
import Button from '../Button';
import EffectValue from '../EffectValue';
import styles from './Round.module.css';

type Props = {
  children: ReactNode;
  review: false | number;
  gremlin: AppState['currentRound']['gremlin'];
  dispatch: GameDispatch;
};
export default function Welcome(props: Props) {
  const review = props.review;
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
        {review ? (
          <Button
            onClick={() => {
              props.dispatch({
                type: 'SET_UI_REVIEW_ACTION',
                payload: review - 1,
              });
            }}
          >
            ◀ Round {review}
          </Button>
        ) : null}
        <Button
          primary
          onClick={() => {
            props.dispatch({ type: 'SET_UI_VIEW_ACTION', payload: 'actions' });
          }}
        >
          {review === false ? 'Start Round' : 'Show Actions'}
        </Button>
        {review !== false && review + 1 < TOTAL_ROUNDS ? (
          <Button
            onClick={() => {
              props.dispatch({
                type: 'SET_UI_REVIEW_ACTION',
                payload: review + 1,
              });
            }}
          >
            Round {review + 2} ▶
          </Button>
        ) : null}
      </div>
    </>
  );
}
