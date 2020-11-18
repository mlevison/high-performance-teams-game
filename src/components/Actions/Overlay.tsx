import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { usePopper } from 'react-popper';
import styles from './Actions.module.css';

type Props = {
  title: ReactNode;
  children: ReactNode;
  referenceElement: HTMLElement | null;
  onClose: () => void;
};

export default function Overlay(props: Props) {
  const referenceElement = props.referenceElement;
  const onClose = props.onClose;
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (ev: MouseEvent) => {
      if (!referenceElement || !ev.target) {
        return;
      }
      if (!referenceElement.contains(ev.target as any)) {
        onClose();
      }
    };
    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [referenceElement, onClose]);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  overlayRef.current = popperElement;
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const popper = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: [
            'bottom',
            'bottom-start',
            'top-end',
            'top',
            'top-start',
            'right',
          ],
        },
      },
      { name: 'preventOverflow' },
      { name: 'arrow', options: { element: arrowElement } },
    ],
  });

  return (
    <div
      data-popper-placement={popper.state?.placement}
      ref={setPopperElement}
      className={styles.overlay}
      style={popper.styles.popper}
      {...popper.attributes}
    >
      <div
        ref={setArrowElement}
        style={popper.styles.arrow}
        className={styles.arrow}
      />
      <div className={styles.overlayInner}>
        <button className={styles.closeOverlay} onClick={() => props.onClose()}>
          ╳
        </button>
        <h3 className={styles.overlayTitle}>{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
}
