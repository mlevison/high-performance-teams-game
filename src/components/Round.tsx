import React, { ReactElement, ReactNode, useState } from 'react';
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

function Actions(props: {
  onNext: () => void;
  description: ReactNode;
  children: ReactNode;
}) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <>
      {props.description && showDescription && props.description}
      {props.description && (
        <Button onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? 'Hide' : 'Show'} Description
        </Button>
      )}
      <Button primary onClick={props.onNext}>
        Complete Round
      </Button>
      {props.children}
    </>
  );
}

export default function Round(props: Props) {
  const [view, setView] = useState<'welcome' | 'actions' | 'results'>(
    'welcome',
  );

  const description = props.currentRound.description ? (
    <div className={styles.description}>{props.currentRound.description}</div>
  ) : null;

  return (
    <>
      <h4 className={styles.number}>
        Round {props.currentRound.number} of {TOTAL_ROUNDS}
      </h4>
      {props.currentRound.title && (
        <h2 className={styles.title}>{props.currentRound.title}</h2>
      )}
      {view === 'welcome' && (
        <>
          {description}
          <div className={styles.center}>
            <Button primary onClick={() => setView('actions')}>
              Start Round
            </Button>
          </div>
        </>
      )}
      {view === 'actions' && (
        <Actions onNext={() => setView('results')} description={description}>
          {props.row1}
          {props.row2}
        </Actions>
      )}
      {view === 'results' && (
        <Button
          primary
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
        </Button>
      )}
    </>
  );
}
