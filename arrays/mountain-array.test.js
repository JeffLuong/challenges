import isMountain from './mountain-array';

describe('isMountain()', () => {
  it('returns true', () => {
    const tests = [
      [1,3,5,7,6,4,2],
      [1,2,3,2,1],
      [1,10,100,10,1]
    ];

    tests.forEach(test => {
      expect(isMountain(test)).toBe(true);
    });
  });

  it('returns false', () => {
    const tests = [
      [1,2],
      [5,2,1,0],
      [1,2,3,4,5,6,7],
      [1,2,3,4,3,4],
      [5,4,3,2,1],
      [1,1,2,1],
      [1,1,1,1]
    ];

    tests.forEach(test => {
      expect(isMountain(test)).toBe(false);
    });
  });
});