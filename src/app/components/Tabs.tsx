import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';
import styles from './Tabs.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Tabs(props: { children?: ReactNode }) {
  return <div className={styles.tabs}>{props.children}</div>;
}

export function Tab({ active, className, ...rest }: Props) {
  return (
    <button
      className={cx(styles.tab, className, active && styles.tabActive)}
      {...rest}
    />
  );
}
