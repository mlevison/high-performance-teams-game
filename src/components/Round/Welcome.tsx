import React from 'react';
import { GameDispatch } from '../../state';
import Button from '../Button';
import Description, { Props as DescriptionProps } from './Description';
import styles from './Round.module.css';

type Props = DescriptionProps & {
  review: false | number;
  dispatch: GameDispatch;
  totalRounds: number;
};
export default function Welcome(props: Props) {
  const review = props.review;
  return (
    <>
      <Description gremlin={props.gremlin}>{props.children}</Description>
      <div className={styles.center}>
        {review ? (
          <Button
            onClick={() => {
              props.dispatch({
                type: 'SET_UI_REVIEW_ACTION',
                payload: review - 1,
              });
            }}
          >
            ◀ Round {review}
          </Button>
        ) : null}
        <Button
          primary
          onClick={() => {
            props.dispatch({ type: 'SET_UI_VIEW_ACTION', payload: 'actions' });
          }}
        >
          {review === false ? 'Start Round' : 'Show Actions'}
        </Button>
        {review !== false && review + 1 < props.totalRounds ? (
          <Button
            onClick={() => {
              props.dispatch({
                type: 'SET_UI_REVIEW_ACTION',
                payload: review + 1,
              });
            }}
          >
            Round {review + 2} ▶
          </Button>
        ) : null}
      </div>
    </>
  );
}
