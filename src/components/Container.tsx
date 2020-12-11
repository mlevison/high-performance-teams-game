import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Container.module.css';

type Props = HTMLAttributes<HTMLDivElement> & {
  review: boolean;
  onClose: () => void;
};

export default function Container({
  className,
  review,
  children,
  onClose,
  ...rest
}: Props) {
  return (
    <div className={cx(className, review && styles.review)} {...rest}>
      {review && (
        <div className={styles.reviewHint}>
          Review <button onClick={onClose}>╳</button>
        </div>
      )}
      {children}
    </div>
  );
}
