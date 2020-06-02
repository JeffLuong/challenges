/**
 * Given two arguments, swap them without using a temporary variable.
 * @param a
 * @param b
 */

// Method using mathematics:
function swapWithMath(a: any, b: any): void {
  console.log(`Before: a: ${a} | b: ${b}`);
  b = b - a;
  a = a + b;
  b = a - b;
  console.log(`After: a: ${a} | b: ${b}`);
}

// Method using ES6 array destructuring & assignment:
function swapWithEs6(a: any, b: any): void {
  console.log(`Before: a: ${a} | b: ${b}`);
  [a, b] = [b, a];
  console.log(`After: a: ${a} | b: ${b}`);
}