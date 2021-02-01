import React from 'react';

export default function Rules() {
  return (
    <>
      <h2>Welcome</h2>
      <p>
        Reading about improvements rarely sparks the deeper changes teams need
        to be effective. This game exists for you to start to see the choices a
        team has to improve.
      </p>
      <p>
        In the longer term is here to spark a discussion among your real team
        about improvements they can make. To that end, the game is best played
        in a single web browser where everyone can see what is happening and
        discuss the options.
      </p>
      <h3>Background</h3>
      <p>
        Your team is working on the World’s Smallest Online Bookstore, a site
        that provides the best results (just a few) for every search, not every
        result on earth. We’re a vulture capital funded company, so if we don’t
        deliver, our funding will be cut. My goal is to help you see the effects
        of choices/tradeoffs on productivity and team cohesion. While some of
        the benefits of Agile happen at the individual level, there are many
        things that affect the relationships between team members and,
        therefore, the overall cohesion and productivity of the team. The game
        simulates a year in the life of a team. Each round represents 6 weeks of
        work.
      </p>
      <h2>Rules</h2>
      <ul>
        <li>The game lasts 10 rounds.</li>
        <li>Your team starts with a working capacity of 10 points.</li>
        <ul>
          <li>
            These points can be spent on delivering Features to your customers
            or Improvements (aka Actions). Each improvement you select costs the
            team Capacity in this round. They provide a benefit in future
            rounds.
          </li>
        </ul>
        <li>
          Improvements fall into three categories:
          <ul>Engineering Practices - improve the quality of your code</ul>
          <ul>
            Communication Practices - improve the team members ability to work
            together
          </ul>
          <ul>
            Product Ownership Practices - make it more likely that the team will
            build the right product
          </ul>
        </li>
        <li>
          Teams that fail to improve all of these categories will eventually be
          penalized.
        </li>
        <li>
          Features - Just like real life, it is not certain the features you
          deliver will be valuable to the customer. At the start of the game
          there is only 30% chance that features committed will delight the
          customer. If your team invests in Product Ownership improvements, that
          chance will go up.
        </li>
        <li>
          In addition the game has gremlins, challenges that crop up that effect
          affect your teams ability to deliver. Examples: Another team borrows
          your best tester; Management yells at a team member.{' '}
          <em>
            Some actions insulate your team against the effects of these
            problems
          </em>
        </li>
        <li>
          If you play well, your team's working capacity will increase round by
          round. Then you will have more points to invest in features and future
          improvements.
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
          selected, the cot of the Actions cost will be deducted from the team's
          Capacity.
          <br></br>
          &nbsp;&nbsp;&nbsp;<b>Click Complete Round</b>
        </li>
        <li>
          The game tells you how much capacity there is to spend on User
          Stories.<br></br>
          &nbsp;&nbsp;&nbsp;<b>Click Roll for User Stories</b>
        </li>
        <li>
          The game rolls a die for each User Story to determine how many are
          actually completed.<br></br>
          &nbsp;&nbsp;&nbsp;<b>Click Next Round</b>
        </li>
        <li>
          At the end of each round, the game also checks to see if your team was
          affected by a Gremlin. Example: "Manager yells at a team member"
        </li>
      </ol>
      <p>
        Notice each round that your Capacity increases or decreases depending on
        the improvements you have made and the gremlins that affect you. After
        round 1, the game displays the active effects of Improvements that were
        previously made.
      </p>
      <p>
        <em>
          Actions not selected in a round are still available for later use. To
          keep the User Interface tidy, they can be found in the round where
          they were first available.
        </em>
      </p>
      <p>
        Hint: play the game as often as you want. So if you want to run
        experiments to see what happens, go for it.
      </p>
      <h2>Limitations</h2>
      <p>
        If you play well you could improve your teams effectiveness by four to
        five times. In reality that would take more than the year implied in the
        game. In addition in reality many improvements would have an ongoing
        cost that is longer than the game simulates.
      </p>
    </>
  );
}
