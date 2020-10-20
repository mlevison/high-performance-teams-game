import {
  BuilderServerAction,
  EngineeringAction,
  TeamMembersOnSameFloor,
  UnitTesting,
} from './CoreAction';
import { Game } from './Game';

/* TODO In some ideal world I would find a more expressive style for most of these tests.

There will be a bunch of tests - SomeAction has effects [a, b, c, d, e]. I could refactor so that the unit tests all have a common body and I just pass in the array, but then the stacktrace/error message might get weird. Is there an elegant BDD style that is easily available? If not I will just refactor

*/
describe('GameSamplePlays', () => {
  describe('Demonstrate Drag Effect if the team make no engineering improvement', () => {
    it('no Enginerring Improvement', () => {
      /* TDOD ideally if understood the functional style these would const or perhaps chained - therefore:
      - Should completedSprint() and addCoreAction() return gameExample to allow chaining?
      */
      let gameExample = new Game();
      // Ideally Stated as a precondition
      expect(gameExample.getCurrentRound()).toEqual(1);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(2);
      expect(gameExample.getCurrentCapacity()).toEqual(9);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(3);
      expect(gameExample.getCurrentCapacity()).toEqual(8);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(4);
      expect(gameExample.getCurrentCapacity()).toEqual(7);
    });

    it('Adding a BuildServer eliminates Drag Effect and has no positive effect on capacity', () => {
      let gameExample = new Game();
      gameExample.addCoreAction(new BuilderServerAction(1));

      expect(gameExample.currentRoundCost()).toEqual(2);

      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(2);
      // Capacity unchanged because we eliminate the drag effect
      expect(gameExample.getCurrentCapacity()).toEqual(10);

      gameExample.completeSprint();
      gameExample.completeSprint();

      expect(gameExample.getCurrentRound()).toEqual(4);
      // Capacity still **unchanged**
      expect(gameExample.getCurrentCapacity()).toEqual(10);
    });
  });

  describe('Team members on the same floor improve communication', () => {
    it('Prove that the action takes effect over many rounds', () => {
      let gameExample = new Game();
      gameExample.addCoreAction(new TeamMembersOnSameFloor(1));

      // Note FakeEngineering action added to eliminate drag effect without having another effect. This just used to ensure we test only the action that matters.
      gameExample.addCoreAction(new EngineeringAction(1));

      expect(gameExample.currentRoundCost()).toEqual(3);

      // Effect we're looking for: 1 Capacity, per round, for 5 rounds, accounting for face to face time
      gameExample.completeSprint();
      expect(gameExample.getCurrentRound()).toEqual(2);
      // Capacity improved by one each round
      expect(gameExample.getCurrentCapacity()).toEqual(11);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(12);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(13);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(14);
      gameExample.completeSprint();
      expect(gameExample.getCurrentCapacity()).toEqual(15);
    });
  });

  describe('Round 2 Actions', () => {
    it('Social Time only Avialble in Round 2', () => {
      // Should we test for this explicitly or simply enforce by convention --- only make
    });
    it('Unit Testing Only Avialble if the BuildServer was implemented', () => {
      let gameExample = new Game();
      gameExample.completeSprint();
      // Added in the 2nd Sprint -- yet it should throw an exception
      // **Problem #1 I can't catch the thrown exce
      expect(gameExample.addCoreAction(new UnitTesting(2))).toThrow();

      // #3 I really wanted something more like this
      // gameExample.hasActionTypeAlreadyBeenAdded(instanceof of BuilderServerAction);
      // only if it responded yes would the UnitTest be added.
      // further - only the action itself should need to know what its andecendant is
    });
  });
});
