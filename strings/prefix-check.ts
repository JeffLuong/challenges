/**
 * Given an array of strings, find the longest available prefix that
 * is present in each. If there is no prefix available, return an empty string
 * 
 * Examples:
 *
 * Input
 * ['abcd', 'abcep', 'abcqdf', 'abcdd']
 *
 * Output
 * 'abc'
 *
 * Input
 * ['eba', 'ae', 'aeon', 'aeape', 'abee']
 * 
 * Output
 * ''
 *
 * Input
 * ['efg', 'efgh', 'efghi', 'efghij', '']
 *
 * Output
 * ''
 *
 */

const getError = (arg: any) => `Invalid type "${typeof arg}" passed into prefix checker. Prefix checker only takes an array of strings.`;

// Greedy solution
const greedyPrefixCheck: (s: string[]) => string = strings => {
  if (strings.length === 0) {
    return '';
  }
  let prefix = strings.shift();

  if (typeof prefix !== 'string') {
    throw new TypeError(getError(prefix));
  }

  for (const string of strings) {
    if (string.length === 0) {
      return '';
    }

    if (typeof string !== 'string') {
      throw new TypeError(getError(string));
    }

    // Check if string includes prefix - example:
    // skip if prefix = 'abcd' and string = 'abcde' <-- longest prefix is 'abcd'
    // loop if prefix = 'abcd' and string = 'abc'   <-- loop through this to find shorter prefix
    if (prefix && !string.includes(prefix)) {
      let curr = '';
      for (let i = 1; i <= string.length; i++) {
        const sliced = string.slice(0, i);
        if (prefix.startsWith(sliced)) {
          curr = sliced;
        } else {
          break;
        }
      }
      // If there is a shorter prefix available, set it.
      // Otherwise return empty string.
      if (curr) {
        prefix = curr;
      } else {
        return '';
      }
    }
  }

  return prefix || '';
};


// Hash/Map solution
const prefixCheckWithMap: (s: string[]) => string = strings => {
  if (strings.length === 0) {
    return '';
  }

  const map: { [key: string]: number } = {};

  for (const string of strings) {
    if (string.length === 0) {
      return '';
    }

    // console.log('STRING ---', typeof string);
    if (typeof string !== 'string') {
      throw new TypeError(getError(string));
    }

    const letters = string.split('');
    let accumulated = '';

    // Map out all available prefixes
    for (const letter of letters) {
      accumulated = `${accumulated}${letter}`;
      if (map[accumulated]) {
        map[accumulated] += 1;
      } else {
        map[accumulated] = 1;
      }
    }
  }

  // Get all counts and find highest
  const counts = Object.values(map);
  const highestCount = Math.max(...counts);

  // If the highest count is less than the number of strings
  // then not all of them have the same prefix.
  if (highestCount !== strings.length) {
    return '';
  }

  const highestCountIdx = counts.lastIndexOf(highestCount);
  return Object.keys(map)[highestCountIdx];
};

export { greedyPrefixCheck, prefixCheckWithMap };