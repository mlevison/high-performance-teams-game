import React, { ReactElement } from 'react';
import { TOTAL_ROUNDS } from '../../constants';
import { AppState } from '../../state';
import styles from './Round.module.css';

type Props = {
  currentRound: AppState['currentRound'];
  ui: AppState['ui'];
  welcome: ReactElement;
  actions: ReactElement;
  results?: ReactElement;
};

export default function Round(props: Props) {
  return (
    <>
      <h4 className={styles.number}>
        Round {props.currentRound.number} of {TOTAL_ROUNDS}
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
