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