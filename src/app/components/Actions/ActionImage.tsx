import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import type { GameAction } from '../../../state';
import { isGameActionWithImage } from '../../../lib';
import styles from './Actions.module.css';

type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  gameAction: GameAction;
};
export default function ActionImage({
  gameAction,
  className,
  style,
  ...rest
}: Props) {
  if (isGameActionWithImage(gameAction)) {
    return (
      <span
        className={cx(styles.actionImage, className)}
        style={{ backgroundImage: `url(${gameAction.image})`, ...style }}
        {...rest}
      />
    );
  }

  return (
    <span className={cx(styles.actionIcon, className)} style={style} {...rest}>
      {gameAction.icon}
    </span>
  );
}
