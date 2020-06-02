/**
 * Given an array of numbers, return a new array that has no
 * duplicated numbers in it.
 * @param arr
 */

function removeDupes(arr: number[]): number[] {
  if (arr.constructor.name !== 'Array') {
    throw new TypeError('Invalid removeDupes() argument. Expected array type.');
  }
  if (!arr.length) {
    return [];
  }

  const nums: { [num: number]: boolean } = {};

  return arr.reduce((a: number[], c: number): number[] => {
    if (typeof c !== 'number') {
      throw new TypeError('Invalid type within removeDupes() array argument.');
    }

    if (!nums[c]) {
      nums[c] = true;
      a.push(c);
    }
    return a;
  }, []);
}

export default removeDupes;