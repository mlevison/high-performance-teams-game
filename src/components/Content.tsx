import React, { ReactNode } from 'react';
import styles from './Content.module.css';

export default function Content(props: { children?: ReactNode }) {
  return <div className={styles.content}>{props.children}</div>;
}
