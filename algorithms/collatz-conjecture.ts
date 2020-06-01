/**
 * Collatz conjecture:
 * Given any positive integer n, follow these rules:
 * - If n is even, divide n by 2
 * - If n is odd, multiply n by 3 and add 1
 * - Repeat the process indefinitely
 * - The conjecture states that no matter which number you start with, you'll always end with 1.
 *
 * Given the number n, the goal is to find out how many steps it takes to reach 1.
 *
 * @param n 
 * @param steps 
 */

function execute(n: number, steps = 0): number {
  if (n <= 0) {
    throw new Error('N must be positive integers only.')
  }

  if (n === 1) {
    return steps;
  }

  if (n % 2 === 0) {
    return execute(n / 2, ++steps);
  }

  return execute(3 * n + 1, ++steps);
}