import countingSort from '../sorting/counting-sort';

/**
 * Given an array of sequential numbers ranging from 1 to n,
 * and one number missing within the array, find that missing number.
 *
 * input = [1,2,3,4,6,7,8,9,10]
 *
 * @param arr
 */

// O(n) solution:
function missingNum(arr: number[]): number {
  const n = arr.length + 1; // add 1 because it's missing 1 number
  const expectedSum = n * (n + 1) / 2; // 55
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  const missing = expectedSum - sum;

  // If missing num is "next" num in array, that means there's no num missing
  if (missing >= arr[arr.length - 1]) {
    return -1;
  }
  return missing;
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