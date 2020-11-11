import React, { ReactElement, useState } from 'react';
import { TOTAL_ROUNDS } from '../constants';
import { AppState, rollGremlin, GameDispatch } from '../state';
import Button from './Button';
import styles from './Round.module.css';

type Props = {
  currentRound: AppState['currentRound'];
  dispatch: GameDispatch;
  row1?: ReactElement;
  row2?: ReactElement;
};

export default function Round(props: Props) {
  const [view, setView] = useState<'welcome' | 'actions' | 'results'>(
    'welcome',
  );

  return (
    <>
      <h4 className={styles.roundHeading}>
        Round {props.currentRound.number} of {TOTAL_ROUNDS}
      </h4>
      {view === 'welcome' && (
        <>
          <div className={styles.description}>
            {props.currentRound.description}
          </div>
          <div className={styles.center}>
            <Button primary onClick={() => setView('actions')}>
              Start Round
            </Button>
          </div>
        </>
      )}
      {view === 'actions' && (
        <>
          <button onClick={() => setView('results')}>Complete Round</button>
          {props.row1}
          {props.row2}
        </>
      )}
      {view === 'results' && (
        <button
          onClick={() =>
            props.dispatch({
              type: 'NEXT_ROUND',
              payload: {
                gremlinRoll: rollGremlin(props.currentRound.number),
              },
            })
          }
        >
          Next Round
        </button>
      )}
    </>
  );
}
