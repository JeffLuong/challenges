/**
 * Given an array of numbers as the first argument and a number as the second,
 * find if there are two numbers in the array that adds up to the second argument.
 * If there is, return `true`, otherwise return `false`.
 *
 * Examples:
 * 
 * Input: [1,2,3,4,5], 7
 * Output: true // because 2 + 5 = 7
 *
 * Input: [1,2,3,4,5], 10
 * Output: false // no 2 numbers in the array add up to 10
 *
 * @param nums
 * @param sum
 */

// Brute force double loop solution:
function bruteSumFinder(nums: number[], sum: number): boolean {
  if (!nums.length) {
    return false;
  }

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === sum) {
        return true;
      }
    }
  }
  return false;
}

// O(n) solution that stores diffs within an object:
// {
//   '5': true //  7 - 2 = 5
//   '2': true <-- once array hits 7 - 5 = 2 the 5 will be looked up and found
// }
// This allows us to check against other numbers. If there is a diff
// that matches an existing one in the object, then there are two numbers
// in the array that adds up to the sum.
function sumFinder(nums: number[], sum: number): boolean {
  if (!nums.length) {
    return false;
  }

  const diffs: { [num: number]: boolean } = {};

  for (let i = 0; i < nums.length; i++) {
    const diff = sum - nums[i];

    if (diffs[diff]) {
      return true;
    }
    diffs[nums[i]] = true;
  }
  return false;
}

/**
 * Given an array of numbers as the first argument and a number as the second,
 * find all pairs in the array that add up to the second argument.
 * The return value should be an array of pairs.
 *
 * Examples:
 * 
 * Input: [1,2,3,4,5], 5
 * Output: [[2,3],[1,4]]
 *
 * Input: [1,2,3,4,5], 10
 * Output: []
 *
 * @param nums
 * @param sum
 */

// Utilizing the same idea as `sumFinder()` we're tracking the diffs between sum
// and numbers. However, the main difference is we're pushing the values into a pairs
// array and resetting the associated diff values to `false` to avoid false pairs.
function sumPairsFinder(nums: number[], sum: number): number[][] {
  if (!nums.length) {
    return [];
  }

  const diffs: { [num: number]: boolean } = {};
  const pairs = [];

  for (let i = 0; i < nums.length; i++) {
    if (typeof nums[i] !== 'number') {
      throw new TypeError('Array of integers must be passed into sumPairsFinder().');
    }

    const diff = sum - nums[i];

    if (diffs[diff]) {
      pairs.push([diff, nums[i]]);
      // Reset to false to avoid false pairs.
      // Example: sumPairsFinder([2,3,5,6,10,2,6,6,6],8) should yield [[3,5],[2,6],[2,6]]
      // and not [[3,5],[2,6],[2,6],[2,6],[2,6]] because there are only two `2`s in the array
      diffs[diff] = false;
      diffs[nums[i]] = false;
    } else {
      diffs[nums[i]] = true;
    }
  }
  return pairs;
}

export { sumFinder, sumPairsFinder };