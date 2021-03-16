import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export type Round6ActionId =
  | 'IMPROVE_FORECASTING'
  | 'SPRINT_BACKLOG_IMPROVEMENT'
  | 'DAILY_SCRUM_MORE_EFFECTIVE';

export const overtimeUserStoryChance = -20;

export const round6: RoundDescription<Round6ActionId> = {
  title: 'Go Live Soon',
  description: (
    <p>
      We must go live with an early version of the product at the end of this
      round. Due to your limited productivity in past rounds, management are
      prepared to offer some options to help you out. We will provide an extra
      ‘4’ points of capacity for anything that helps. Overtime? Don\'t worry a
      little overtime won't hurt.
    </p>
  ),
  effect: (_, currentRound) => {
    if (currentRound === 6) {
      return {
        capacityChange: 4,

        title: 'Management is paying overtime',
      };
    }
    if (currentRound === 7 || currentRound === 8) {
      return {
        userStoryChange: overtimeUserStoryChance,
        title: 'Overtime harmed focus and qualityq',
      };
    }
    return null;
  },
  actions: {
    IMPROVE_FORECASTING: {
      image: example,
      name: 'Improve Forecasting',
      description: (
        <p>Switch from a simple velocity model to probablistic forecasts.</p>
      ),
      cost: 1,
    },
    SPRINT_BACKLOG_IMPROVEMENT: {
      image: example,
      name: 'Improve Sprint Backlog',
      description: <p>Team takes ownership of their Sprint Backlog</p>,
      cost: 1,
      effect(age) {
        if (age < 2) {
          return { capacityChange: 0, userStoryChange: 0 };
        }
        return {
          capacityChange: 1,
          userStoryChange: 5,
        };
      },
    },
    DAILY_SCRUM_MORE_EFFECTIVE: {
      image: example,
      name: 'Make Daily Scrum more Effective',
      description: (
        <>
          <p>Refocus Daily Scrum on the Sprint Goal</p>
          <p>
            For a deeper understanding see:{' '}
            <a href="https://agilepainrelief.com/blog/daily-scrum-pain.html">
              Scrum by Example – Feeling Pain from Your Daily Scrum?
            </a>
          </p>
        </>
      ),
      cost: 1,
      effect(age) {
        if (age < 2) {
          return { capacityChange: 0, userStoryChange: 0 };
        }
        if (age === 2) {
          return { capacityChange: 1, userStoryChange: 5 };
        }
        return {
          capacityChange: 2,
          userStoryChange: 10,
        };
      },
    },
  },
};
