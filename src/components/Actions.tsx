import React, { ButtonHTMLAttributes, useState } from 'react';
import { GameActionWithStatus } from 'state/gameActions/getAvailableGameActions';
import { GameDispatch, AppState } from '../state';
import styles from './Actions.module.css';

type Props = {
  currentRound: number;
  availableGameActions: AppState['availableGameActions'];
  dispatch: GameDispatch;
};

function onlyRound(number: number) {
  return (actionWithStatus: GameActionWithStatus): boolean =>
    actionWithStatus.gameAction.available.round === number;
}

type RoundActionsProps = {
  round: number;
  dispatch: GameDispatch;
  initialVisible: boolean;
  actionsWithStatus: GameActionWithStatus[];
};

type ActionProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'onDoubleClick'
> &
  GameActionWithStatus;

function Action(props: ActionProps) {
  return (
    <button
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      className={styles.action}
      disabled={
        props.status.type === 'SELECTED' || props.status.type === 'MISSING_DEP'
      }
    >
      <span
        className={styles.actionImage}
        style={{ backgroundImage: 'url(https://placekitten.com/100/100)' }}
      ></span>
      <span className={styles.actionTitle}>{props.gameAction.name}</span>
    </button>
  );
}

function RoundActions(props: RoundActionsProps) {
  const [visible, setVisible] = useState(props.initialVisible);

  return (
    <li>
      <button
        className={styles.roundVisibleToggle}
        onClick={() => setVisible(!visible)}
      >
        Round {props.round} {visible ? '▲' : '▼'}
      </button>
      {visible && (
        <ul className={styles.roundActionList}>
          {props.actionsWithStatus.map(
            /* eslint-disable-next-line array-callback-return */
            ({ status, gameAction }): JSX.Element => {
              return (
                <li key={gameAction.id}>
                  <Action
                    status={status}
                    gameAction={gameAction}
                    onClick={() => console.log('open')}
                    onDoubleClick={() => console.log('SELECT')}
                  />
                </li>
              );
            },
          )}
        </ul>
      )}
    </li>
  );
}

export default function Actions(props: Props) {
  return (
    <>
      <h2>Available Actions</h2>
      <ul className={styles.roundList}>
        {Array(props.currentRound)
          .fill('')
          .map((_, i) => {
            const round = i + 1;
            return (
              <RoundActions
                dispatch={props.dispatch}
                key={round}
                initialVisible={round === props.currentRound}
                round={round}
                actionsWithStatus={props.availableGameActions.filter(
                  onlyRound(round),
                )}
              />
            );
          })}
      </ul>
    </>
  );
}
