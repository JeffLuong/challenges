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

const solveEquation = (c: number): boolean => {
  const a = [];
  let result = false;

  // Find all squared values that are less than c
  for (let i = 0; i < c; i++) {
    const pow = Math.pow(i, 2);
    if (pow > c) {
      break;
    }
    a.push(pow);
  }

  // Iterate through each squared value, and sum them to see if they add up to c
  for (let x = 0; x < a.length; x++) {
    for (let y = x + 1; y < a.length; y++) {
      if (a[x] + a[y] === c) {
        result = true;
        break;
      }
    }
  }
  return result;
};