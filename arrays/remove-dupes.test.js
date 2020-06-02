import removeDupes from './remove-dupes';

describe('removeDupes()', () => {
  describe('properly removes duplicates if any exist', () => {
    it('Test 1', () => {
      expect(removeDupes([1,5,3,2,5,3])).toEqual([1,5,3,2]);
    });

    it('Test 2', () => {
      expect(removeDupes([100,52151,323,214,985,343])).toEqual([100,52151,323,214,985,343]);
    });

    it('Test 3', () => {
      expect(removeDupes([1,2,3,4,5,6,7,8,9,1])).toEqual([1,2,3,4,5,6,7,8,9]);
    });

    it('Test 4', () => {
      expect(removeDupes([10,9,8,7,6,5,4,3,2,1,10])).toEqual([10,9,8,7,6,5,4,3,2,1]);
    });

    it('Test 5', () => {
      expect(removeDupes([])).toEqual([]);
    })
  });

  it('throws expected error if there is an improper type within argument', () => {
    expect(() => { removeDupes([1,'five',3,2,5,3]); }).toThrow(TypeError);
    expect(() => { removeDupes([null,10,2]); }).toThrow(TypeError);
    expect(() => { removeDupes([{}]); }).toThrow(TypeError);
    expect(() => { removeDupes([() => {}]); }).toThrow(TypeError);
    expect(() => { removeDupes({}); }).toThrow(TypeError);
    expect(() => { removeDupes(''); }).toThrow(TypeError);
    expect(() => { removeDupes(1); }).toThrow(TypeError);
    expect(() => { removeDupes(null); }).toThrow(TypeError);
    expect(() => { removeDupes(); }).toThrow(TypeError);
  });
});