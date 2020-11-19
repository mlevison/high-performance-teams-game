import React from 'react';

export default function Rules() {
  return (
    <>
      <h2>Welcome</h2>
      <p>Your team is working on the World’s Smallest Online Bookstore, a site that provides the best results (just a few) for every search, not every result on earth. We’re a vulture capital funded company, so if we don’t deliver, our funding will be cut.

      My goal is to help you see the effects of choices/tradeoffs on productivity and team cohesion. While some of the benefits of Agile happen at the individual level, there are many things that affect the relationships between team members, and therefore the overall cohesion and productivity of the team.
      </p>
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
          <li>If you play well your team's capacity will increase round by round</li>
        </ul>
        <h2>Rounds</h2>
        Each round consists of a series of steps:
        <ol>
          <li>You get a round description. Click <b>Start Round</b></li>
          <li>Select Improvements or Actions that will affect the team. Once selected the actions cost will be taken away from the teams Capacity Click. <b>Complete Round</b></li>
          <li>The Game tells you how much capacity there is to spend on User Stories. Click <b>Roll for User Stories</b> </li>
          <li>The rolls a die for each User Story to determine how many are actually completed. Click <b>Next Round</b></li>
          <li>At the end of each round the game also checks to see if your team was affected by a Gremlin - example - "Manager yells at a team member"</li>
        </ol>
        Notice each round your Capacity increases or decreases depending on the improvements you have made and the gremlins that affect you.

        After round 1 the game displays the active effects of Improvements that were previously made.

        Hint - play the game as often as you want. So if you want to run experiments to see what works - go for it.
      </p>
    </>
  );
}
