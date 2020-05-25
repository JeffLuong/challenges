/**
 * Takes two arrays, and counts how many times they exist from one array in the other.
 * @param arr
 * @param counts
 */

function countItems(arr: number[], counts: number[]): number[] {
  for (let j = 0; j < arr.length; j++) {
    counts[arr[j]] += 1;
  }
  return counts;
}

/**
 * Takes an array of integers, then sorts them ascending.
 * @param arr
 */

function countingSort(arr: number[]): number[] {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const counts = countItems(arr, new Array(max + 1).fill(0));
  const sorted = [];

  for (let x = min; x <= max; x++) {
    while (counts[x] > 0) {
      sorted.push(x);
      counts[x] -= 1;
    }
  }
  return sorted;
}

export default countingSort;