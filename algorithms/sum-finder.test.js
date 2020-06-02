import { sumPairsFinder } from './sum-finder';

describe('sumPairsFinder()', () => {
  describe('finds expected pairs', () => {
    it('all correctly matched', () => {
      expect(sumPairsFinder([1,2,3,4,5,6], 7)).toEqual([[3,4],[2,5],[1,6]]);
    });

    it('with no false pairs', () => {
      expect(sumPairsFinder([2,3,5,6,10,2,6,6,6], 8)).toEqual([[3,5],[2,6],[2,6]]);
    });
  });

  describe('handles invalid arguments', () => {
    it('with empty array argument', () => {
      expect(sumPairsFinder([])).toEqual([]);
    });

    it('with invalid values in array', () => {
      expect(() => sumPairsFinder(['hello'])).toThrow(TypeError);
      expect(() => sumPairsFinder([null])).toThrow(TypeError);
      expect(() => sumPairsFinder([{}])).toThrow(TypeError);
      expect(() => sumPairsFinder([[]])).toThrow(TypeError);
    });
  });
});