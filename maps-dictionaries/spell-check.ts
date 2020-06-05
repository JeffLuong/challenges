/**
 * Given an array of correctly spelled words as the first argument and a sentence string,
 * as the second argument, find and return all words that are incorrectly spelled within
 * the sentence.
 *
 * Example:
 * 
 * Input
 * ['happy', 'birthday', 'to', 'you', 'John'], 'Happy birhday To you john'
 *
 * Output
 * ['birhday', 'To', 'john']
 *
 * Reason
 * 'birthday' // missing 't'
 * 'To'       // the 'T' is capitalized where it shouldn't be
 * 'john'     // the 'j' should be capitalized
 *
 * @param words
 * @param str
 */

// O(n + a) solution where `n` is the number of words in the array
// and `a` is the number of words in sentence.
function spellcheck(words: string[], str: string): string[] {
  const wordsInSent = str.split(' ');
  const misspelled = [];
  const dic: { [word: string]: { caseSensitive: boolean } } = {};

  for (const word of words) {
    if (!dic[word]) {
      dic[word] = { caseSensitive: word.toLowerCase() !== word };
    }
  }

  for (let i = 0; i < wordsInSent.length; i++) {
    const word = wordsInSent[i];
    const lowerCased = word.toLowerCase();
    const cached = dic[lowerCased]; // first, check lowercased version of word.

    // If lowercased version of word exists and is not equal to current word:
    if (cached && lowerCased !== word) {
      // Check if it's the not the beginning of sentence and case is insensitive OR
      // if case is sensitive, the word is misspelled.
      if (i > 0 && !cached.caseSensitive || cached.caseSensitive) {
        misspelled.push(word);
      }
    } else if (!dic[word]) {
      misspelled.push(word);
    }
  }
  return misspelled;
}

export default spellcheck;