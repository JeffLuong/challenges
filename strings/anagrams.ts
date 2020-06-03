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

export default groupAnagrams;