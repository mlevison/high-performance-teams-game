import React from 'react';

type Props = {
  storiesCompleted: number;
};

export default function Results(props: Props) {
  return (
    <>
      <h2>Results</h2>
      <p>Completed {props.storiesCompleted} user stories</p>
    </>
  );
}
