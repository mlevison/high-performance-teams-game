import React, { ReactElement } from 'react';
import type { AppState } from '../../../state';
import styles from './Round.module.css';

type Props = Pick<AppState, 'currentRound' | 'ui'> & {
  totalRounds: number;
  welcome: ReactElement;
  actions: ReactElement;
  results?: ReactElement;
};

export default function Round(props: Props) {
  return (
    <>
      <h4 className={styles.number}>
        Round {props.currentRound.number} of {props.totalRounds}
      </h4>
      {props.currentRound.title && (
        <h2 className={styles.title}>{props.currentRound.title}</h2>
      )}
      {props.ui.view === 'welcome' && props.welcome}
      {props.ui.view === 'actions' && props.actions}
      {props.ui.view === 'results' && props.results}
    </>
  );
}
