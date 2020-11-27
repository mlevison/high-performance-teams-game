import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { TOTAL_ROUNDS } from '../constants';
import {
  AppState,
  GameDispatch,
  ClosedRound,
  isUserStoryChanceEffect,
  startUserStoryChance,
} from '../state';
import Button from './Button';
import styles from './Round.module.css';

type Props = {
  currentRound: AppState['currentRound'];
  closeRound: () => ClosedRound;
  dispatch: GameDispatch;
  overlayRef: MutableRefObject<HTMLDivElement | null>;
  row1?: ReactElement;
  row2?: ReactElement;
};

function Actions(props: {
  onNext: () => void;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <Button onClick={props.onBack}>◀ Back</Button>
      <Button primary onClick={props.onNext}>
        Complete Round
      </Button>
      {props.children}
    </>
  );
}

type View = 'welcome' | 'actions' | 'results';

export default function Round(props: Props) {
  const [view, setView] = useState<View>('welcome');
  const [closedRound, setClosedRound] = useState<ClosedRound>();

  const description = props.currentRound.description ? (
    <div className={styles.description}>{props.currentRound.description}</div>
  ) : null;

  const userStoryEffects = props.currentRound.activeEffects.filter(
    isUserStoryChanceEffect,
  );

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
          {props.currentRound.gremlin && (
            <>
              <h3>Gremlin</h3>
              Just happened:&nbsp;
              <strong>⚠️ {props.currentRound.gremlin.name}</strong>
              {props.currentRound.gremlin.description}
            </>
          )}
          <div className={styles.center}>
            <Button primary onClick={() => setView('actions')}>
              Start Round
            </Button>
          </div>
        </>
      )}
      {view === 'actions' && (
        <Actions
          onNext={() => setView('results')}
          onBack={() => setView('welcome')}
        >
          <div ref={props.overlayRef} />
          <div className={styles.rows}>
            <div className={styles.row}>{props.row1}</div>
            <div className={styles.row}>{props.row2}</div>
          </div>
        </Actions>
      )}
      {view === 'results' && (
        <>
          <p>
            What is the chance that each User Story will successfully be built?
          </p>
          <h3>Calculation</h3>
          <ul className={styles.userStoryChanceList}>
            <li>&nbsp;&nbsp;&nbsp;{startUserStoryChance}% base chance</li>
            {userStoryEffects.map((effect) => (
              <li key={effect.title}>
                {effect.userStoryChance > 0 ? '+' : '-'}{' '}
                {effect.userStoryChance.toString().replace(/^-/, '')}%{' '}
                {effect.title}
              </li>
            ))}
            <li>
              = {props.currentRound.userStoryChance}% chance to successful
              finish user-story
            </li>
            <li>---</li>
            {!closedRound && (
              <>
                <li>
                  x &nbsp; {props.currentRound.capacity.available} capacity to
                  spend on user stories
                </li>
                <li>&nbsp;</li>
              </>
            )}
            {closedRound && (
              <>
                <li>
                  {props.currentRound.capacity.available} user stories attempted
                </li>
                <li>{closedRound.storiesCompleted} user stories completed</li>
              </>
            )}
          </ul>

          <ul className={styles.userStoryIcons}>
            {Array(props.currentRound.capacity.available)
              .fill('')
              .map((_, i) => (
                <li key={i}>
                  {!closedRound
                    ? '❓'
                    : i < closedRound.storiesCompleted
                    ? '✅'
                    : '❌'}
                </li>
              ))}
          </ul>
          <div className={styles.center}>
            <Button
              disabled={!!closedRound}
              onClick={() => {
                setClosedRound(props.closeRound());
              }}
            >
              Roll for User Stories
            </Button>
            <Button
              primary
              disabled={!closedRound}
              onClick={() => {
                if (!closedRound) {
                  throw new Error(
                    'Can not go to next round without closing this one',
                  );
                }
                props.dispatch({
                  type: 'NEXT_ROUND',
                  payload: closedRound,
                });
              }}
            >
              Next Round
            </Button>
          </div>
        </>
      )}
    </>
  );
}
