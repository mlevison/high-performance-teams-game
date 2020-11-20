import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import { AppState, useAppState, UNIQUE_ACTION } from './state';
import { ClosedRound } from 'state/round';

jest.mock('./state');

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
  it('displays current round', () => {
    (useAppState as jest.Mock).mockReturnValue([
      {
        ...BASE_STATE,
        currentRound: {
          ...BASE_STATE.currentRound,
          number: 3,
        },
      },
      jest.fn(),
      jest.fn(),
    ]);
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Round 3 of 6/i }),
    ).toBeInTheDocument();
  });

  it('has buttons to move between round views and to next round', () => {
    const dispatchSpy = jest.fn();
    const closeRoundSpy = jest.fn();
    (useAppState as jest.Mock).mockReturnValue([
      BASE_STATE,
      dispatchSpy,
      closeRoundSpy,
    ]);
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Start Round/i }));
    expect(screen.getByText(/Round 1 of/)).toBeInTheDocument();
    const closedRound: ClosedRound = {
      gremlinRoll: 1,
      selectedGameActionIds: [],
      storiesCompleted: 5,
    };
    closeRoundSpy.mockReturnValue(closedRound);
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
    (useAppState as jest.Mock).mockReturnValue([
      {
        ...BASE_STATE,
        availableGameActions: [
          {
            status: { type: 'AVAILABLE', times: UNIQUE_ACTION },
            gameAction: {
              id: 'MY_ACTION_ID',
              round: 1,
              name: 'My Action',
              effect: () => null,
              description: '',
              cost: 2,
            },
          },
        ],
      },
      dispatchSpy,
      jest.fn(),
    ]);
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
