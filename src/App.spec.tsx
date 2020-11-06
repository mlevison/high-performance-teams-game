import React, { Dispatch } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import * as state from './state';
import { AppState } from './state/useAppState';
import { Action } from './state/game';

const setState: (newState: AppState) => void = (state as any).setState;
const setDispatch: (newDispatch: Dispatch<Action>) => void = (state as any)
  .setDispatch;
const reset: () => void = (state as any).reset;

const BASE_STATE: AppState = {
  availableGameActions: [],
  currentRound: {
    number: 1,
    capacity: {
      available: 10,
      total: 10,
    },
    activeEffects: [],
  },
  result: {
    storiesCompleted: 0,
  },
  pastRounds: [],
};

describe('App UI', () => {
  beforeEach(() => {
    reset();
  });

  it('displays current round', () => {
    setState({
      ...BASE_STATE,
      currentRound: {
        ...BASE_STATE.currentRound,
        number: 3,
      },
    });
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Round 3 of 6/i }),
    ).toBeInTheDocument();
  });

  it('has button to move to next round', () => {
    const dispatchSpy = jest.fn();
    setState(BASE_STATE);
    setDispatch(dispatchSpy);
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Complete Round/i }));

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'NEXT_ROUND',
      payload: { gremlin: undefined },
    });
  });
});

jest.mock('./state', () => {
  let state: AppState | null = null;
  let dispatch: Dispatch<Action> | null = null;

  return {
    getGremlin() {},
    setState(newState: AppState) {
      state = newState;
    },
    setDispatch(newDispatch: Dispatch<Action>) {
      dispatch = newDispatch;
    },
    reset() {
      state = null;
      dispatch = null;
    },
    useAppState: () => {
      if (state === null) {
        throw new Error(
          'Unexpected invocation of useAppState before mocked state is set',
        );
      }
      return [
        state,
        dispatch ||
          (() => {
            throw new Error('Unexpected invocation of dispatch');
          }),
      ];
    },
  };
});
