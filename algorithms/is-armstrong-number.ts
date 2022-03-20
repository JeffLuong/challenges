/**
 * An Armstrong number is an n-digit number that is equal to the sum of the nth
 * powers of its digits. Determine if the input number is an Armstrong number.
 * Return either true or false.
 *
 * Example:
 * 1^​3​ + 5^​3​​ + 3^​3​​ = 153
 *
 * @param {number} num
 * @returns {boolean}
 */
function isArmStrongNumber(num: number): boolean {
  const str = num.toString();
  const pow = str.length;
  const sum = str.split('').reduce((acc, curr) =>
    acc + Math.pow(Number(curr), pow),
    0
  );
  return sum === num;
}