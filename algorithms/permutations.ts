/**
 * Given a string, find and return all possible permutations of the string.
 *
 * Example:
 *
 * Input: 'abc'
 * Output: ['abc', 'acb', 'bac', bca', 'cab', 'cba']
 *
 * @param str
 */
function permutations(str: string): string | string[] {
  if (!str) {
    return '';
  }

  if (str.length === 1) {
    return str;
  }

  const perms = [];

  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    // Check the first index of current letter, if it doesn't match current index,
    // skip it, since algorithm would've already processed this permutation.
    // (i.e. 'bba' and curr index is 1, but it also exists at 0, skip this)
    if (str.indexOf(letter) !== i) {
      continue;
    }

    // Get the rest of the letters in string by excluding the current letter.
    // (i.e. str is 'helo', and index is 2. We remove 'l' and 'heo' remains)
    const rest = `${str.slice(0, i)}${str.slice(i + 1, str.length)}`;

    // Loop through the permutations of the rest of the letters (recursively).
    for (const perm of permutations(rest)) {
      perms.push(`${letter}${perm}`);
    }
  }
  return perms;
}