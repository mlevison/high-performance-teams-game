import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { TOTAL_ROUNDS } from '../constants';
import { AppState, GameDispatch, ClosedRound } from '../state';
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

type View = 'welcome' | 'actions' | 'results';

export default function Round(props: Props) {
  const [view, setView] = useState<View>('welcome');
  const [closedRound, setClosedRound] = useState<ClosedRound>();

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
          {props.currentRound.gremlin && (
            <>
              <h3>⚠️ {props.currentRound.gremlin.name}</h3>
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
        <Actions onNext={() => setView('results')} description={description}>
          <div ref={props.overlayRef} />
          <div className={styles.rows}>
            <div className={styles.row}>{props.row1}</div>
            <div className={styles.row}>{props.row2}</div>
          </div>
        </Actions>
      )}
      {view === 'results' && (
        <>
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
          {!closedRound && (
            <p className={styles.userStoryDescription}>
              {props.currentRound.capacity.available} capacity to spend on user
              stories
              <br />
              <br />
            </p>
          )}
          {closedRound && (
            <p className={styles.userStoryDescription}>
              {props.currentRound.capacity.available} user stories attempted
              <br />
              {closedRound.storiesCompleted} user stories completed
            </p>
          )}
          {/* <ul>
            <li>Attempted {props.currentRound.capacity.available} Stories</li>
            <li>Completed {view.payload.storiesCompleted} Stories</li>
          </ul> */}
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
