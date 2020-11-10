import React, { ReactNode } from 'react';
import styles from './Header.module.css';

type Props = {
  children?: ReactNode;
};
export default function Header(props: Props) {
  return (
    <div className={styles.header}>
      <h1>High-Performance Team Game </h1>
      {props.children}
    </div>
  );
}
