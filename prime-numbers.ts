/**
 * Given a number, check if it is a prime number (divisible only by
 * 1 or itself).
 *
 * @param num
 */

function isPrime(num: number): boolean {
  // If number is even or less than 2, then they are not prime.
  if ((num > 3 && num % 2 === 0) || num <= 1) {
    return false;
  }
  // Loop through 3 to number, incrementing by 2 (since we already
  // checked for even cases) and check if any number is a factor of
  // the number. If it is, it's not prime.
  for (let i = 3; i < num; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Given a number, find all prime numbers that are factors of the
 * given number.
 *
 * Examples:
 *
 * Input: 14
 * Output: [2, 7]
 * Reason: 2 and 7 are prime numbers that when multiplied together = 14
 *
 * Input: 12
 * Output: [2, 2, 3]
 * Reason: 2, 2, 3 are prime numbers that when multiplied together = 12
 *
 * @param num 
 */

function getPrimeFactorsOf(num: number): number[] {
  const primes = [];
  let divisor = 2;
  let _num = num;

  // Being loop with 2 since nums are divisble by 1 and 0 anyway
  // and 2 is the first prime number to check
  while (2 < _num) {
    if (_num % divisor === 0) {
      primes.push(divisor);
      // Divide the number with the current prime value, then find
      // the next prime factor for this new number
      _num = _num / divisor;
    } else {
      // Increase the divisor if it is not prime (after 3, the divisor
      // can increment by 2 since anything that is even is divisble by 2)
      divisor += (divisor >= 3 ? 2 : 1);
    }
  }
  return primes;
}