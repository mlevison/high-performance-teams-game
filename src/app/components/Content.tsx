import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Content.module.css';

export default function Content({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(className, styles.content)} {...rest} />;
}
