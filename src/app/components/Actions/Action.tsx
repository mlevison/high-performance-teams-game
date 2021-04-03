import React, { useRef, useState } from 'react';
import cx from 'classnames';
import type { GameActionWithStatus } from '../../../state';
import styles from './Actions.module.css';
import Overlay from './Overlay';
import Button from '../Button';
import ActionImage from './ActionImage';

type ActionProps = GameActionWithStatus & {
  review: boolean;
  isOpen: boolean;
  availableCapacity: number;
  onOpen: (open: boolean) => void;
  onSelect: (selected: boolean) => void;
};

export default function Action(props: ActionProps) {
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(
    null,
  );
  const clickTimer = useRef<NodeJS.Timeout>();
  const gameAction = props.gameAction;

  const disabled =
    props.review ||
    (props.status.type === 'AVAILABLE' &&
      gameAction.cost > props.availableCapacity) ||
    ['MISSING_DEP', 'FINISHED'].includes(props.status.type);

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
          if (disabled) {
            return;
          }
          if (clickTimer.current) {
            clearTimeout(clickTimer.current);
          }
          props.onSelect(props.status.type === 'AVAILABLE');
        }}
        className={cx(
          styles.action,
          disabled && !props.review && styles.disabled,
          props.status.type === 'MISSING_DEP' && styles.missingDep,
          props.status.type === 'SELECTED' && styles.actionSelected,
          props.status.type === 'FINISHED' && styles.actionFinished,
        )}
      >
        <ActionImage gameAction={props.gameAction} />
        <span>{props.gameAction.name}</span>
      </button>
      {props.isOpen && (
        <Overlay
          referenceElement={buttonElement}
          title={props.gameAction.name}
          onClose={() => props.onOpen(false)}
        >
          {props.status.dependencies.length ? (
            <>
              <h4 className={styles.requiresTitle}>Requires</h4>
              <ul className={styles.requiresList}>
                {props.status.dependencies.map((dep) => (
                  <li key={dep.id}>
                    {dep.missing ? '❌' : '✅'} {dep.name}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {props.gameAction.description}
          <p>
            <b>Cost</b>: {props.gameAction.cost}
          </p>
          {!disabled && (
            <Button
              primary={props.status.type === 'AVAILABLE'}
              onClick={() => {
                props.onOpen(false);
                props.onSelect(props.status.type === 'AVAILABLE');
              }}
            >
              {props.status.type === 'SELECTED' ? 'Remove' : 'Select'}
            </Button>
          )}
          {disabled && props.status.type === 'FINISHED' && (
            <Button primary disabled>
              Finished
            </Button>
          )}
        </Overlay>
      )}
    </>
  );
}
