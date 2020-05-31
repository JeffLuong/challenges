/**
 * Without using String.prototype.reverse(), take a given string and
 * return the reverse.
 *
 * @param str 
 */

function reverseStr(str: string): string {
  const chars = str.split('');
  const reversed = [];

  for (let i = chars.length - 1; i >= 0; i--) {
    reversed.push(chars[i]);
  }
  return reversed.join('');
}