import countingSort from './sorting/counting-sort';

/**
 * Given an array of sequential numbers ranging from 1 to n,
 * and one number missing within the array, find that missing number.
 *
 * @param arr
 */

// O(n) solution:
function missingNum(arr: number[]): number {
  const n = arr.length + 1;
  let expectedSum = n * (n + 1) / 2;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return expectedSum - sum;
}

// Brute force using countingSort()
function bruteMissingNum(arr: number[]): number {
  const sorted = countingSort(arr);

  for (let i = 0; i < sorted.length; i++) {
    const curr = i + 1;
    if (curr !== sorted[i]) {
      return curr;
    }
  }
  return -1;
}