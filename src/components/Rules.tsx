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
            <li>This Capacity can also be spent on Improvements (aka Actions). These improvements cost the team Capacity this round and may provide benefit in future rounds.</li>
          </ul>
          <li>Teams that fail to improve both Communications and Engineering Practice will eventually be penalized.</li>
        </ul>
        <h2>Rounds</h2>
        Each round consists of a series of steps:
        <ol>
          <li>You get a round description - Click <b>Start Round</b></li>
          <li>Select Improvements or Actions that will affect the team. Once selected the actions cost will be taken away from the teams Capacity Click <b>Complete Round</b></li>
          <li>The game determines how many Stories you attempted and then roles a die to determine how many were completed. Click <b>Next Round</b></li>
          <li>At the end of each round the game also checks to see if your team was affected by a Gremlin - example - "Manager yells at a team member"</li>
        </ol>
        Notice each round your Capacity increases or decreases depending on the improvements you have made and the gremlins that affect you.

        After round 1 the game displays the active effects of Improvements that were previously made.

        Hint - play the game as often as you want. So if you want to run experiments to see what works - go for it.
      </p>
    </>
  );
}
