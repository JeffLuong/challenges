/**
 * Given a sentence string, reverse each word within it in place:
 *
 * reverseWords('hi my name is bob') // 'ih ym eman si bob'
 *
 * @param sentence 
 */

function reverseWords(sentence: string): string {
  const reversed = [];
  let temp = '';

  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === ' ') {
      reversed.push(temp);
      temp = '';
    } else {
      temp = `${sentence[i]}${temp}`;
      if ((sentence.length - 1) === i) {
        reversed.push(temp);
      }
    }
  }
  return reversed.join(' ');
}