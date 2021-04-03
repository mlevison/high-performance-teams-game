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
