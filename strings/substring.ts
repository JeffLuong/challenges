/**
 * Given a string and a substring to match, return the starting index
 * of the found substring. Examples:
 * 
 * Input: substringIndex('abbcdabbbbbck', 'ab')
 * Output: 0
 *
 * Input: substringIndex('abbcdabbbbbck', 'bck')
 * Output: 10
 *
 * Input substringIndex('abbcdabbbbbck', 'bbbck')
 * Output: 9
 * 
 * @param str 
 * @param sub 
 */

function substringIndex(str: string, sub: string): number {
  let subIndex = 0;
  let foundIdx = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === sub[subIndex]) {
      foundIdx = i;

      for (let j = i; subIndex < sub.length; j++) {
        if (str[j] === sub[subIndex]) {
          if (sub.length - 1 === subIndex) {
            return foundIdx;
          }
          subIndex += 1;
        } else {
          subIndex = 0;
          break;
        }
      }
    }
  }
  return -1;
}
