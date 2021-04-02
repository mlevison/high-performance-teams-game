import React from 'react';
import type { RoundDescription } from '../../state';
import example from './images/example.jpg';

export const overtimeUserStoryChance = -20;
export const overtimeCapacityBump = 4;

export const round6: RoundDescription = {
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
        capacityChange: overtimeCapacityBump,
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
    IMPROVE_RETROSPECTIVES_CONCRETE_ACTIONS: {
      image: example,
      name: 'Make Retrospective Action Items Concrete',
      type: 'COMMUNICATION',
      description: (
        <>
          <p>Team make Retrospective Action Items Concrete and Actionable</p>
          <p>
            For examples and depth see:{' '}
            <a href="https://agilepainrelief.com/guide-to-effective-agile-retrospectives">
              The Guide to Effective Agile Retrospectives
            </a>
          </p>
        </>
      ),
      cost: 1,
      effect(age) {
        if (age < 2) {
          return { capacityChange: 0 };
        }
        if (age === 2) {
          return { capacityChange: 1 };
        }
        return { capacityChange: 2 };
      },
    },
    LEARNING_TIME: {
      image: example,
      name: 'Learning time',
      description: (
        <>
          <p>
            Take a few hours every Sprint and use that time to learn or practice
            a new skill as a team.
          </p>
          <p>
            For a deeper understanding see:{' '}
            <a href="https://agilepainrelief.com/blog/scrummaster-tales-the-team-learn-how-to-learn.html">
              Scrum By Example – The Team Learn How to Learn
            </a>
          </p>
        </>
      ),
      cost: 2,
      effect(age) {
        let description =
          'Setting aside time to learn and practice speeds all kinds of skill acquistion and improvement';
        if (age === 0) {
          return {
            title: description,
            capacityChange: 0,
          };
        }
        if (age < 2) {
          return {
            title: description,
            capacityChange: 1,
          };
        }
        if (age === 2 || age === 3) {
          return {
            title: description,
            capacityChange: 2,
          };
        }
        return {
          title: description,
          capacityChange: 3,
        };
      },
    },
    SPRINT_BACKLOG_IMPROVEMENT: {
      image: example,
      name: 'Improve Sprint Backlog',
      type: 'COMMUNICATION',
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
      type: 'COMMUNICATION',
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
