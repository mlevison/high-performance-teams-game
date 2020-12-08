import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { TOTAL_ROUNDS } from '../../constants';
import { AppState } from '../../state';
import Button from '../Button';
import styles from './Round.module.css';
import { View } from './types';
import Welcome from './Welcome';

type Props = {
  currentRound: AppState['currentRound'];
  overlayRef: MutableRefObject<HTMLDivElement | null>;
  row1?: ReactElement;
  row2?: ReactElement;
  results?: ReactElement;
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

export default function Round(props: Props) {
  const [view, setView] = useState<View>('welcome');

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
        <Welcome setView={setView} gremlin={props.currentRound.gremlin}>
          {description}
        </Welcome>
      )}
      {view === 'actions' && (
        <Actions
          onNext={() => setView('results')}
          onBack={() => setView('welcome')}
        >
          <div ref={props.overlayRef} />
          {props.currentRound.gremlin && (
            <p>
              ⚠️ Gremlin just happened:&nbsp;
              <strong>{props.currentRound.gremlin.name}</strong>
            </p>
          )}
          <div className={styles.rows}>
            <div className={styles.row}>{props.row1}</div>
            <div className={styles.row}>{props.row2}</div>
          </div>
        </Actions>
      )}
      {view === 'results' && props.results}
    </>
  );
}
