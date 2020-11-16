import React, { Dispatch } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import * as state from './state';
import { AppState } from './state/useAppState';
import { Action } from './state/game';
import { ClosedRound } from 'state/round';
import { UNIQUE } from 'state/gameActions/getAvailableGameActions';

const setState: (newState: AppState) => void = (state as any).setState;
const setNextClosedRound: (closedRound: ClosedRound) => void = (state as any)
  .setNextClosedRound;
const setDispatch: (newDispatch: Dispatch<Action>) => void = (state as any)
  .setDispatch;
const reset: () => void = (state as any).reset;

const BASE_STATE: AppState = {
  availableGameActions: [],
  currentRound: {
    selectedGameActions: [],
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

  it('has buttons to move between round views and to next round', () => {
    const dispatchSpy = jest.fn();
    setState(BASE_STATE);
    setDispatch(dispatchSpy);
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Start Round/i }));
    expect(screen.getByText(/Round 1 of/)).toBeInTheDocument();
    const closedRound: ClosedRound = {
      gremlinRoll: 1,
      selectedGameActionIds: [],
      storiesCompleted: 5,
    };
    setNextClosedRound(closedRound);
    fireEvent.click(screen.getByRole('button', { name: /Complete Round/i }));
    expect(screen.getByText(/Round 1 of/)).toBeInTheDocument();
    expect(
      screen.getByText(/10 capacity to spend on user stories/),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Roll/i }));
    expect(screen.getByText(/10 user stories attempted/)).toBeInTheDocument();
    expect(screen.getByText(/5 user stories completed/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Next Round/i }));

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'NEXT_ROUND',
      payload: closedRound,
    });
  });

  it('can select actions in round 1', () => {
    const dispatchSpy = jest.fn();
    setState({
      ...BASE_STATE,
      availableGameActions: [
        {
          status: { type: 'AVAILABLE', times: UNIQUE },
          gameAction: {
            id: 'MY_ACTION_ID' as any,
            available: { round: 1 },
            name: 'My Action',
            effect: () => null,
            description: '',
            cost: 2,
          },
        },
      ],
    });
    setDispatch(dispatchSpy);
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Start Round/i }));
    fireEvent.doubleClick(screen.getByRole('button', { name: /My Action/i }));

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'SELECT_GAME_ACTION',
      payload: 'MY_ACTION_ID',
    });
  });
});

jest.mock('./state', () => {
  let state: AppState | null = null;
  let nextClosedRound: ClosedRound | null = null;
  let dispatch: Dispatch<Action> | null = null;

  return {
    setState(newState: AppState) {
      state = newState;
    },
    setDispatch(newDispatch: Dispatch<Action>) {
      dispatch = newDispatch;
    },
    setNextClosedRound(closedRound: ClosedRound) {
      nextClosedRound = closedRound;
    },
    reset() {
      state = null;
      dispatch = null;
      nextClosedRound = null;
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
        () => {
          if (!nextClosedRound) {
            throw new Error(
              'Unexpected invocation of closeRound before mocked closed round is set',
            );
          }
          return nextClosedRound;
        },
      ];
    },
  };
});
