import React, { useRef } from 'react';
import cx from 'classnames';
import {
  GameActionWithStatus,
  isGameActionWithIcon,
  isGameActionWithImage,
} from '../../state';
import styles from './Actions.module.css';

type ActionProps = GameActionWithStatus & {
  onClick: (elm: HTMLButtonElement) => void;
  onDoubleClick: () => void;
};

export default function Action(props: ActionProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const clickTimer = useRef<NodeJS.Timeout>();
  const gameAction = props.gameAction;

  return (
    <button
      ref={ref}
      onClick={() => {
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
        }
        clickTimer.current = setTimeout(() => props.onClick(ref.current!), 300);
      }}
      onDoubleClick={() => {
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
        }
        props.onDoubleClick();
      }}
      className={cx(
        styles.action,
        ['SELECTED', 'FINISHED'].includes(props.status.type) &&
          styles.actionSelected,
      )}
      disabled={['MISSING_DEP', 'FINISHED'].includes(props.status.type)}
    >
      {isGameActionWithImage(gameAction) && (
        <span
          className={styles.actionImage}
          style={{ backgroundImage: `url(${gameAction.image})` }}
        ></span>
      )}
      {isGameActionWithIcon(gameAction) && (
        <span className={styles.actionIcon}>{gameAction.icon}</span>
      )}

      <span>{props.gameAction.name}</span>
    </button>
  );
}
