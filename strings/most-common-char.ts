/**
 * Finds the most common character within a given string.
 * Solution is O(n) where n is number of chars in the given string.
 * @param {string}
 * @returns {string}
 */

function findMostCommonChar(str: string): string {
  if (typeof str !== 'string' || !str) {
    throw new TypeError(`${str} is not a typeof string`);
  }

  const dic: { [key: string]: number } = {};
  // Highest number of occurrences of any particular char
  let occurrence = 0;
  // Keep track of latest char that has highest occurrence
  let mostCommon = '';

  str.split('').forEach(char => {
    dic[char] = dic[char] ? dic[char] + 1 : 1;

    if (dic[char] >= occurrence) {
      // Keep running count of char with most occurrence so far
      occurrence = dic[char];
      // Update the most common char
      mostCommon = char;
    }
  });

  return mostCommon;
}
