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
 * Input:
 * Denominations: [6, 8, 7, 19] and total is 4033
 *
 * Output:
 * 214
 *
 * Reason:
 * 4033 can be made up by 19 * 211 + 8 * 3
 *
 * @param denominations
 * @param amount 
 */

function countCoins(denominations: number[], amount: number): number {
  // Create a cached array of numbers that represents the smallest number of coins
  // required for each amount (index) of the array.
  const table = Array(amount).fill(amount + 1);
  // Add one more table slot into array which would be initialized as 0
  table.unshift(0);
  // Initialized array should look something like this:
  // [0, amount+1, amount+1, amount+1, amount+1]

  for (let i = 1; i < table.length; i++) {
    for (let j = 0; j < denominations.length; j++) {
      const coin = denominations[j];
      if (amount >= i && coin <= i) {
        // Get the best cached number at table[i - coin] that has been solved
        // i.e. if current amount (i) is 4 and coin number is 1, then best number at table[4-1]
        // is table[3] which is 2
        const bestNum = table[i - coin];
        // Add the best number (2 coins) plus 1 coin to use (3)
        const num = bestNum === 0 ? 1 : bestNum + 1;
        // Get the smallest number of coins compared to it's current number
        table[i] = Math.min(num, table[i]);
      }
    }
  }
  return table[table.length - 1];
}