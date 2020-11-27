import { storySucceeds } from './storySucceeds';
import { reset, addRolls } from './notRandom';

jest.mock('./random', () => require('./notRandom'));

describe('storySucceeds', () => {
  beforeEach(reset);

  it('tells if random rolls are in range of chance or not', () => {
    addRolls([0, 0.2]);
    expect(storySucceeds(10)).toBe(true);
    expect(storySucceeds(10)).toBe(false);

    addRolls([0.2, 0.22]);
    expect(storySucceeds(21)).toBe(true);
    expect(storySucceeds(21)).toBe(false);
  });
});
