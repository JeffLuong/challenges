/**
 * Given an number representing the index of a list of fibonacci numbers,
 * find the value at that given index.
 *
 * @param index
 */

function getFibonacci(index: number): number {
  // Initialize the fibonacci numbers list
  const fib = [0, 1];

  if (index <= 2) {
    return index === 0 ? 0 : 1;
  }

  // Compute fib numbers up until it reaches the index
  for (let i = 2; i <= index; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }

  return fib[index];
}

/**
 * Given an number representing the index of a list of fibonacci numbers,
 * sum up all fibonacci numbers up until the value at that given index.
 *
 * Input: 5
 *
 * Output: 12
 *
 * Explanation: Given fibonacci numbers up until index 5 ([0, 1, 1, 2, 3, 5])
 * the sum of all these numbers is 12.
 *
 * Complexity: O(n) where n is the size of the array up until the index
 *
 * @param index
 */

function sumFibonacci(index: number): number {
  const fib = [0, 1];

  if (index < 0) {
    throw new Error('Index must be greater than or equal to 0');
  }

  if (index <= 2) {
    return index === 0 ? 0 : 1;
  }

  let total = 1;

  for (let i = 2; i <= index; i++) {
    const sum = fib[i - 1] + fib[i - 2];
    fib.push(sum);
    total += sum;
  }

  return total;
}