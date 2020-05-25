import countingSort from './sorting/counting-sort';

/**
 * Given a list of coin denominations (i.e. [1, 5, 10, 25]) and a total amount,
 * find the least number of coins that can make up the total. If there are no
 * combinations of denominations that can make up the total, return -1.
 *
 * Examples:
 *
 * Input:
 * Denominations: [6, 5, 7, 9] and total 22
 * 
 * Output:
 * -1
 * 
 * Reason:
 * No combination in the given denominations can make up 22
 *
 * Input:
 * Denominations: [12, 2, 3, 11] and total 15
 * 
 * Output:
 * 2
 * 
 * Reason:
 * 15 can be made up using one coin of 3 and one coin of 12
 *
 * @param denominations
 * @param amount 
 */

function countCoins(denominations: number[], amount: number): number {
  if (denominations.length === 0) {
    return -1;
  }

  // Sort denominations as fast as possible
  const denom = countingSort(denominations);
  // Store total count possibilities (number of coins possible to make amount)
  const totalCounts = [];

  for (let i = denom.length - 1; i >= 0; i--) {
    const den = denom[i];
    // The num of times curr coin goes into amount (rounded down)
    let count = Math.floor(amount / den);
    // What the accumulated amount when using this denominator
    let accum = count * den;

    // If the this denominator divides evenly by this amount, push it
    if (accum === amount) {
      totalCounts.push(count);
    } else {
      // Or else, loop through the rest of the denominators
      for (let j = i - 1; j >= 0; j--) {
        while (accum + denom[j] <= amount) {
          count += 1;
          accum += denom[j];
          if (accum === amount) {
            totalCounts.push(count);
            break;
          }
        }
      }
    }
  }
  return totalCounts.length ? Math.min(...totalCounts) : -1;
}