/**
 * Given an array of numbers and an optional direction argument,
 * check to see if the given array is sorted.
 *
 * @param nums
 * @param direction
 */

function isSorted(nums: number[], direction?: string): boolean {
  for (let i = 0; i < nums.length; i++) {
    if (direction === 'desc') {
      if (nums[i] < nums[i + 1]) {
        return false;
      }
    } else {
      if (nums[i] > nums[i + 1]) {
        return false;
      }
    }
  }
  return true;
}