/**
 * Given a square 2D matrix of integers, get the absolute difference between
 * the two diagonal totals.
 * @param {Number[][]>} arr 
 */

function diagonalDiff(arr: number[][]): number {
  const diags: number[] = [0, 0];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (i + j === len - 1) {
        diags[1] += arr[i][len - 1 - i];
      }
      if (i === j) {
        diags[0] += arr[i][j];
      }
    }
  }
  return Math.abs(diags[0] - diags[1]);
}
