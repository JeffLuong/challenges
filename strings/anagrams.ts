/**
 * Given an array of words, find and group them based their anagram possibilities.
 * Example:
 *
 * Input:
 * ['rat', 'tar', 'art', 'well', 'lewl', 'pop', 'opp', 'oops', 'bar']
 * 
 * Output:
 * [
 *   [ 'rat', 'tar', 'art' ],
 *   [ 'well', 'lewl' ],
 *   [ 'pop', 'opp' ],
 *   [ 'oops' ],
 *   [ 'bar' ]
 * ]
 *
 * @param words 
 */
function groupAnagrams(words: string[]): string[][] {
  if (words.constructor.name !== 'Array') {
    throw new TypeError('groupAnagrams() must take an array argument of strings.');
  }

  if (!words.length) {
    return [];
  }

  const grouped: { [key: string]: string[] } = {};

  for (const word of words) {
    if (typeof word !== 'string') {
      throw new TypeError('Anagrams must be strings.')
    }

    const sorted = word.split('').sort().join('');

    if (grouped[sorted]) {
      grouped[sorted].push(word);
    } else {
      grouped[sorted] = [word];
    }
  }

  return Object.values(grouped);
}

/**
 * Takes 2 string parameters and returns boolean whether or not they are anagrams.
 *
 * Questions:
 *   - Should we care about case sensitivity?
 *   - Should we always expect strings to have a length?
 *   - Should we always expect parameters to be strings?
 *
 * @param str1 
 * @param str2 
 * @returns 
 */

function isAnagram(str1: string, str2: string): boolean {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new TypeError('Function isAnagram() must take 2 string parameters');
  }

  if (str1.length !== str2.length) {
    return false;
  }

  const sortedStr1 = str1.toLowerCase().split('').sort().join('');
  const sortedStr2 = str2.toLowerCase().split('').sort().join('');
  return sortedStr1 === sortedStr2;
}

export default { groupAnagrams, isAnagram };