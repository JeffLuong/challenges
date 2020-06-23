/**
 * Given an array of n numbers where n > 2, check to see if it is a
 * "mountain" array. Mountain arrays are defined by ONE "peak" located
 * in an index i where i > 0 and i < n.
 *
 * This means that the peak must be the largest number in the array and in
 * an index position between the first and last number in the array.
 * 
 * A mountain array also can't have any "plateaus", so if there are any
 * numbers in the array that are contiguous and equal to each other, the
 * array is not a mountain. Examples:
 *
 * Valid mountain arrays:
 * [1,2,3,4,3,2,1]
 * [5,6,10,9,8,5,3,1]
 * [6,7,6]
 *
 * Invalid mountain arrays:
 * [1,2]
 * [5,4,3,2,1]
 * [1,2,3,4,5]
 * [1,1,2,3,4,3,2]
 * [1,2,3,4,3,4,3,2,1]
 *
 * @param arr
 */

function isMountain(arr: number[]): boolean {
  if (arr.length < 3) {
    return false;
  }

  // Temp value to hold maximum number.
  let max = null;

  for (let i = 0; i < arr.length; i++) {
    // If end of array, break loop.
    if (i === arr.length - 1) {
      break;
    }

    const next = arr[i + 1];
    const curr = arr[i];

    if (curr === next) {
      return false;
    }

    // If there is no max number yet and the curr num is larger than next:
    if ((max === null) && (curr > next)) {
      // If max is first in array, return false immediately.
      if (i === 0) {
        return false;
      }
      // Otherwise set the max to current.
      max = curr;
    } else if (max !== null && (curr <= next)) {
      return false;
    }
  }

  // If there was never a max set, that means the array was just a decreasing
  // set of numbers. Return false.
  if (max === null) {
    return false
  }

  return true;
}

export default isMountain;