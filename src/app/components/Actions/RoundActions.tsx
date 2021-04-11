import React, { useState } from 'react';
import type { GameActionWithStatus } from '../../../state';
import styles from './Actions.module.css';
import Action from './Action';

type Props = {
  round: number;
  review: boolean;
  initialVisible: boolean;
  openGameActionId?: string;
  availableCapacity: number;
  onOpen: (open: boolean, id: string) => void;
  onSelect: (selected: boolean, actionWithStatus: string) => void;
  actionsWithStatus: GameActionWithStatus[];
};

export default function RoundActions(props: Props) {
  const [visible, setVisible] = useState(
    () =>
      /* Always show selected actions in review */
      (props.review &&
        props.actionsWithStatus.find(
          ({ status: { type } }) => type === 'SELECTED',
        )) ||
      props.initialVisible,
  );
  const selected = props.actionsWithStatus.filter(
    ({ status: { type } }) => type === 'FINISHED' || type === 'SELECTED',
  ).length;

  return (
    <>
      <li>
        <button
          className={styles.roundVisibleToggle}
          onClick={() => setVisible(!visible)}
        >
          Round {props.round} {visible ? '▲' : '▼'}{' '}
          <small>
            ({selected}/{props.actionsWithStatus.length} actions selected)
          </small>
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
                      review={props.review}
                      availableCapacity={props.availableCapacity}
                      isOpen={
                        props.openGameActionId ===
                        actionWithStatus.gameAction.id
                      }
                      onOpen={(open) =>
                        props.onOpen(open, actionWithStatus.gameAction.id)
                      }
                      onSelect={(selected) =>
                        props.onSelect(selected, actionWithStatus.gameAction.id)
                      }
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
