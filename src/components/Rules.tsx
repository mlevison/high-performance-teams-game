import React from 'react';

export default function Rules() {
  return (
    <>
      <h2>Welcome</h2>
      <p>
        Purpose: To spark a discussion among your real team about improvements
        they can make. To that end the game is best played in a single web
        browser where everyone can see what is happening and discuss the
        options.
        <em>
          Eventually each action will link to a blog post or section of our
          reference library with more material.
        </em>
      </p>
      <p>
        Your team is working on the World’s Smallest Online Bookstore, a site
        that provides the best results (just a few) for every search, not every
        result on earth. We’re a vulture capital funded company, so if we don’t
        deliver, our funding will be cut. My goal is to help you see the effects
        of choices/tradeoffs on productivity and team cohesion. While some of
        the benefits of Agile happen at the individual level, there are many
        things that affect the relationships between team members, and therefore
        the overall cohesion and productivity of the team.
      </p>
      <h2>Rules</h2>
      <ul>
        <li>
          Rounds represent 6 weeks or 3 Sprints in the life of your team. This
          has no effect on game play, the length was selected because most
          improvements take a more than 2 weeks to take root.
        </li>
        <li>The game lasts 10 rounds or 30 weeks</li>
        <li>Your team starts with a Capacity of 10 pontsi</li>
        <ul>
          <li>This Capacity can be spent on User Stories</li>
          <li>
            This Capacity can also be spent on Improvements (aka Actions). These
            improvements cost the team Capacity this round and may provide
            benefit in future rounds.
          </li>
        </ul>
        <li>
          Teams that fail to improve both Communications and Engineering
          Practice will eventually be penalized.
        </li>
        <li>
          Failure to invest in things that aid your resilience will harm your
          team later rounds.
        </li>
        <li>
          If you play well your team's capacity will increase round by round
        </li>
      </ul>
      <h2>Rounds</h2>
      <p>Each round consists of a series of steps:</p>
      <ol>
        <li>
          You get a round description.<br></br>
          &nbsp;&nbsp;&nbsp;<b>Click Start Round</b>
        </li>
        <li>
          Select Improvements or Actions that will affect the team. Once
          selected the actions cost will be taken away from the teams Capacity
          <br></br>
          &nbsp;&nbsp;&nbsp;<b>Click Complete Round</b>
        </li>
        <li>
          The Game tells you how much capacity there is to spend on User
          Stories.<br></br>
          &nbsp;&nbsp;&nbsp;<b>Click Roll for User Stories</b>
        </li>
        <li>
          The rolls a die for each User Story to determine how many are actually
          completed.<br></br>
          &nbsp;&nbsp;&nbsp;<b>Click Next Round</b>
        </li>
        <li>
          At the end of each round the game also checks to see if your team was
          affected by a Gremlin - example - "Manager yells at a team member"
        </li>
      </ol>
      <p>
        Notice each round your Capacity increases or decreases depending on the
        improvements you have made and the gremlins that affect you. After round
        1 the game displays the active effects of Improvements that were
        previously made.
      </p>
      <p>
        Hint play the game as often as you want. So if you want to run
        experiments to see what works go for it.
      </p>
    </>
  );
}
