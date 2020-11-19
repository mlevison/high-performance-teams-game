import React, { useRef, useState } from 'react';
import cx from 'classnames';
import {
  GameActionWithStatus,
  isGameActionWithIcon,
  isGameActionWithImage,
} from '../../state';
import styles from './Actions.module.css';
import Overlay from './Overlay';
import { Button } from 'components';

type ActionProps = GameActionWithStatus & {
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  onSelect: (selected: boolean) => void;
};

export default function Action(props: ActionProps) {
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null,
  );
  const clickTimer = useRef<NodeJS.Timeout>();
  const gameAction = props.gameAction;

  return (
    <>
      <button
        ref={setButtonElement}
        onClick={() => {
          if (clickTimer.current) {
            clearTimeout(clickTimer.current);
          }
          clickTimer.current = setTimeout(() => props.onOpen(true), 300);
        }}
        onDoubleClick={() => {
          if (clickTimer.current) {
            clearTimeout(clickTimer.current);
          }
          props.onSelect(props.status.type === 'AVAILABLE');
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
      {props.isOpen && (
        <Overlay
          referenceElement={buttonElement}
          title={props.gameAction.name}
          onClose={() => props.onOpen(false)}
        >
          <p>{props.gameAction.description}</p>
          <p>
            <b>Cost</b>: {props.gameAction.cost}
          </p>
          <Button
            primary={props.status.type === 'AVAILABLE'}
            onClick={() => props.onSelect(props.status.type === 'AVAILABLE')}
          >
            {props.status.type === 'SELECTED' ? 'Remove' : 'Select'}
          </Button>
        </Overlay>
      )}
    </>
  );
}
