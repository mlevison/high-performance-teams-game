import React from 'react';

export default function Rules() {
  return (
    <>
      <h2>Welcome</h2>
      <p>
        Reading about improvements rarely sparks the deeper changes that teams
        need to be effective. This game exists so you can start to see the
        choices a team has to improve.
      </p>
      <p>
        In the longer term, the game is here to spark a discussion among your
        real team about improvements they can make. To that end, the game is
        best played in a single web browser where everyone can see what is
        happening and discuss the options.<br></br>Some people have fun playing
        the game by themselves.
      </p>
      <h3>Background</h3>
      <p>
        Your team is working on the World’s Smallest Online Bookstore, a site
        that provides the best results (just a few) for every search, not every
        result on earth. Your team is a software development team, focused on
        driving more sales of the best books in the world.
      </p>
      <p>
        Your team is part of a company being funded by a Vulture Capital - that
        means, if you don’t deliver, our funding will be cut for the entire
        company. Your goal is to build a high-performing team, while
        delivering a meaningful ROI to our investors. You'll be faced with some
        choices in each round, but remember: all the investors care about is the
        delivery of features. You don't want to let them, your teammates, and
        the company overall, down. 
      </p>
      <p>
        My goal is to help you see the effects of choices/tradeoffs on
        productivity and team cohesion. While some of the benefits of Agile
        happen at the individual level, there are many things that affect the
        relationships between team members and, therefore, the overall cohesion
        and productivity of the team. The game simulates a year in the life of a
        team. Each round represents a month of work.
      </p>
      <h2>Rules</h2>
      <p>
        <em>
          You can come back and review the rules at any point without losing
          game progress
        </em>
      </p>
      <ul>
        <li>The game lasts 10 rounds.</li>
        <li>Your team starts with a working capacity of 10 points.</li>
        <ul>
          <li>
            These points can be spent on delivering Features to your customers
            or possible Improvements (aka Actions). Each improvement you select
            costs the team feature development capacity, just like real life.
            And, also like in real life, these actions may or may not provide a
            benefit in future rounds. We certainly hope they'll give us a
            benefit, but not everything works out as planned.
          </li>
        </ul>
        <li>
          Improvements fall into three categories:
          <ul>Engineering Practices - improve the quality of your code</ul>
          <ul>
            Communication Practices - improve the ability of team members to
            work together
          </ul>
          <ul>
            Product Ownership Practices - make it more likely that the team will
            build the right product
          </ul>
        </li>
        <li>
          How you balance your investment in these improvements with the
          delivery of features is entirely up to your team. Some improvement
          practices have prerequisites.
        </li>
        <li>
          Speaking of Features, just like real life, it is not certain the
          features you deliver will be valuable to the customer. At the start of
          the game, when you have little knowledge of the market and your target
          customers, there's a strong possibility that what your team commits to
          and delivers will actually delight the customer.
        </li>
        <li>
          The game has gremlins -- that is, challenges that may crop up and
          impact your team's ability to deliver. You may be able to avoid some
          of these. But don't forget that your goal is the delivery of valuable
          software that our customers will love.
        </li>
        <li>
          And while your goal is to deliver features, the leaders of this
          company have decided to give you a chance to get the team started on
          the right foot. They've agreed to allow you to consider some possible
          Improvements even before you've delivered one Story. But, they do
          remind you that every improvement that you want to implement needs to
          be done by the team, so will reduce their capacity to deliver
          features.
        </li>
      </ul>
      <h2>Rounds</h2>
      <p>Each round consists of a series of steps:</p>
      <ol>
        <li>
          You get a round description. Read the description as a team. &nbsp;
          <b>Click Start Round</b>
        </li>
        <li>
          Select Improvements or Actions that will affect the team.{' '}
          <ul>
            <li>
              Once selected, the cost of the Action will be deducted from the
              team's Capacity.
            </li>
            <li>
              You can see your capacity reduce every time you select an Action
              item.
            </li>
            <li>
              Click <b>"Begin Development"</b>
            </li>
            <li>
              And, you might get some feedback from the Senior Leaders of your
              company, based on your choices.
            </li>
          </ul>
        </li>
        <li>
          The game shows you how much capacity there is remaining to develop
          your User Stories.
        </li>
        <li>
          Click <b>Roll for User Stories</b>
        </li>
        <ul>
          <li>
            The game rolls a die for each User Story to determine how many are
            actually completed. That's right. Not every Story will
            necessarily get completed. Just like real life.
          </li>
          <li>
            Have a look at how much work your team completed, and the impact
            that's having. You may notice some feedback at the bottom, based on
            your progress. It's worth considering any feedback you receive,
            since it's coming from the people paying your salary.
          </li>
        </ul>
        <li>
          Click <b>Next Round</b>
          <ul>
            <li>
              At the end of each round, the game also checks to see if your team
              was affected by a Gremlin. Example: "Manager yells at a team
              member"
            </li>
            <li>
              As you progress through the rounds, you'll notice that your
              Capacity increases or decreases depending on the improvements you
              have made, or not, and the Gremlins that affect you.
            </li>
            <li>
              After round 1, the game displays the active impacts of
              Improvements that were previously made.
            </li>
            <li>
              Actions not selected in a round are still available for the team
              to adopt at a later time. To keep the User Interface tidy, they
              can be found in the round where they were first available.
            </li>
          </ul>
        </li>
      </ol>
      <p>
        Hint: play the game as often as you want. So if you want to run
        experiments to see what happens, go for it.
      </p>
      <h2>Limitations</h2>
      <p>
        If you play well you could improve your teams effectiveness by four to
        five times. In reality, that would take more than the year implied in
        the game. In addition, in reality many improvements would have an
        ongoing cost that is longer than the game simulates.
      </p>
      <p>Copyright: https://agilepainrelief.com 2021</p>
    </>
  );
}
