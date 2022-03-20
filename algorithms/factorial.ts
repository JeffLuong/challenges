type Factorial = (num: number) => number;

/**
 * Find the factorial of a given a number.
 *
 * Complexity: O(n)
 */

const factorial: Factorial = (num) => {
  if (num < 0) {
    return -1;
  }

  if (num === 0) {
    return 1;
  }

  let total = num;

  for (let i = num - 1; i >= 1; i--) {
    total = i * total;
  }

  return total;
};

/**
 * Find the factorial of a given a number.
 * Recursive solution
 *
 * Complexity: O(n)
 */

const recursiveFactorial: Factorial = (num) => {
  if (num < 0) {
    return -1;
  }

  if (num === 1) {
    return 1;
  }

  return num * recursiveFactorial(num - 1);
};
