import React, { useState } from 'react';
import { GameActionId, GameActionWithStatus } from '../../state';
import styles from './Actions.module.css';
import Action from './Action';

type Props = {
  round: number;
  initialVisible: boolean;
  onOpen: (elm: HTMLElement, id: GameActionId) => void;
  onSelect: (actionWithStatus: GameActionWithStatus) => void;
  actionsWithStatus: GameActionWithStatus[];
};

export default function RoundActions(props: Props) {
  const [visible, setVisible] = useState(props.initialVisible);
  return (
    <>
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
              (actionWithStatus): JSX.Element => {
                return (
                  <li key={actionWithStatus.gameAction.id}>
                    <Action
                      {...actionWithStatus}
                      onClick={(ev) =>
                        props.onOpen(ev, actionWithStatus.gameAction.id)
                      }
                      onDoubleClick={() => {
                        props.onSelect(actionWithStatus);
                      }}
                    />
                  </li>
                );
              },
            )}
          </ul>
        )}
      </li>
    </>
  );
}
