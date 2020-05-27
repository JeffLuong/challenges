/**
 * Given a string, check if the string is a palindrome.
 * (Palindrome is if a word, phrase, number, or other sequence
 * of characters which reads the same backward or forward)
 *
 * @param str
 */

function isPalindrome(str: string): boolean {
  // Remove non number or letter characters and lower case entire string
  const _str = str.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
  const len = _str.length;
  // Loop through half of the string's length and check for inequality
  for (let i = 0; i < len / 2; i++) {
    // Compare letters from the left to the right (end of string increment backwards)
   if (_str[i] !== _str[len - 1 - i]) {
      return false;
    };
  }
  return true;
}