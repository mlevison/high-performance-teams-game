import React, { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
};

export default function Button({ primary, className, ...rest }: Props) {
  return (
    <button
      className={cx(className, styles.button, primary && styles.primary)}
      {...rest}
    />
  );
}
