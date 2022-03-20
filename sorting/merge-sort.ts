/**
 * Splits an array recursively into havles until only 1 unit is left.
 * @param arr
 */

function splitIt(arr: number[]): number[][] {
  if (arr.length === 1) {
    return [arr];
  }
  const mid = arr.length / 2;
  return [
    ...splitIt(arr.slice(0, mid)),
    ...splitIt(arr.slice(mid, arr.length))
  ];
}

/**
 * Takes two arrays and combines them into one, sorting them in the process.
 * @param a1
 * @param a2
 */

function combineIt(a1: number[], a2: number[]): number[] {
  const sCombined = [];
  let comb = [...a1, ...a2];
  let combLen = comb.length;

  while (combLen > 0) {
    const smallest = Math.min(...comb);
    if (smallest !== undefined) {
      // Remove the smallest from the combined array.
      comb.splice(comb.indexOf(smallest), 1);
      sCombined.push(smallest);
      combLen--;
    }
  }
  return sCombined;
}

/**
 * Recursively iterates through a list of arrays of numbers, combining them two
 * at a time using `combineIt()`.
 * @param arr
 * @param lastUnit
 */

function sortIt(arr: number[][], lastUnit?: number[]): number[] {
  if (arr.length === 1) {
    return arr[0];
  }

  const sorted = [];
  const last = lastUnit || (arr.length % 2 === 0 ? [] : arr[arr.length - 1]);

  for (let i = 0; i < arr.length; i += 2) {
    if (arr[i + 1]) {
      sorted.push(combineIt(arr[i], arr[i + 1]));
    }
  }
  if (last && last.length) {
    sorted.push(last);
  }
  return sortIt(sorted);
}

/**
 * Sorts a given array using merge sort.
 * @param arr
 */

export function mergeSort(arr: number[]): number[] {
  return sortIt(splitIt(arr));
}