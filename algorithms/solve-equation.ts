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
  // Find all squared values that are less than c
  for (let i = 0; i < c; i++) {
    const sqd = Math.pow(i, 2);
    if (sqd > c) {
      break;
    }
    // Example: c = 13 and current sqd number = 4 that means diff is 9
    // Then check if sq root of diff (9) is a whole number.
    if (Number.isInteger(Math.sqrt(c - sqd))) {
      return true;
    }
  }
  return false;
};