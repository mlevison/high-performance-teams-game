import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Rows.module.css';

export function Rows({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(className, styles.rows)} {...rest} />;
}

export function Row({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(className, styles.row)} {...rest} />;
}
