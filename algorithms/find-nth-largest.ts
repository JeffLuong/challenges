/**
 * Given an array `arr` and an index `n` where `n <= arr.length - 1`, find
 * the `nth` largest number within the array. Example:
 *
 * Input:
 * findNthLargest([5,7,2,3,4,1,6],3);
 *
 * Output:
 * // 5
 *
 * Reason:
 * 5 is the 3rd largest number within the array
 *
 * @param arr
 * @param left
 * @param right
 */

function findPivot(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  // Keep track of the index to swap values.
  let index = left;

  for (let i = index; i < right; i++) {
    // Check to see if the value of arr[i] is less than pivot,
    // if it is, swap them, if not ignore it. This is effectively
    // 'sorting' the partioned left side.
    if (arr[i] < pivot) {
      const val = arr[i];
      arr[i] = arr[index];
      arr[index] = val;
      index += 1;
    }
  }
  // Lastly, swap the value that is larger than the pivot with
  // the index you're tracking.
  arr[right] = arr[index];
  arr[index] = pivot;
  return index;
}

function findNthLargest(arr: number[], n: number): number {
  const nth = arr.length - n;
  // init left and right indexes
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Find the index that 
    const pivotIdx = findPivot(arr, left, right);

    if (pivotIdx === nth) {
      return arr[pivotIdx];
    } else if (pivotIdx > nth) {
      right = pivotIdx - 1;
    } else {
      left = pivotIdx + 1;
    }
  }
  return -1;
}
