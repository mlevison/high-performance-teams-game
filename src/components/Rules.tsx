import React from 'react';

export default function Rules() {
  return (
    <>
      <h2>Rules</h2>
      <p>
        <ul>
          <li>Rounds represent 6 weeks or 3 Sprints in the life of your team</li>
          <li>The game lasts 10 rounds or 30 weeks</li>
          <li>Your team starts with a Capacity of 10 pontsi</li>
          <ul>
            <li>This Capacity can be spent on User Stories</li>
            <li>This Capacity can also be spent on Improvements (aka Actions)</li>
          </ul>
          <li>Teams that fail to improve both Communications and Engineering Practice will eventually be penalized.</li>
        </ul>
        Hint - play the game as often as you want. So if you want to run experiments to see what works - go for it.
      </p>
    </>
  );
}
