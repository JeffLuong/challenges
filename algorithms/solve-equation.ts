/**
 * Given a number c, return true / false if there are 2 squared numbers
 * that sum up to c. The equation to solve for is: a^2 + b^2 = c
 *
 * Examples:
 *
 * Input: 13
 * Output: true
 * Reason: 2^2 + 3^2 = 13 therefore it is true
 *
 * Input: 27
 * Output: false
 * Reason: no 2 squared values adds up to 27
 *
 * @param c
 */

// O(n) solution
const solveEquation = (c: number): boolean => {
  // Cache the squared numbers until c
  // The key is the diff between c - sqd (current sqd num)
  const sqdDiffs: { [diff: number]: number } = {};

  // Find all squared values that are less than c
  for (let i = 0; i < c; i++) {
    const sqd = Math.pow(i, 2);
    if (sqd > c) {
      break;
    }
    // Example: c = 13 and current sqd number = 4 that means diff is 9
    // we cache { '9': 4 } so that when the current sqd num is 9
    // we know the that the sum exists
    const diff = c - sqd;

    if (sqdDiffs[sqd] !== undefined) {
      return true;
    } else {
      sqdDiffs[diff] = sqd;
    }
  }
  return false;
};