const wraps = {
  '(': ')',
  '{': '}',
  '[': ']'
} as const;

type OpenWraps = keyof typeof wraps;

function isCloseWrap(char: string): boolean {
  switch(char) {
    case ')':
    case '}':
    case ']':
      return true;
    default:
      return false;
  }
}

function isOpenWrap(char: string): boolean {
  switch(char) {
    case '(':
    case '{':
    case '[':
      return true;
    default:
      return false;
  }
}

function isBalanced(str: string): boolean {
  if (typeof str !== 'string') {
    throw new TypeError('isBalanced() requires string argument');
  }

  if (!str.length) {
    return false;
  }

  const stack: OpenWraps[] = [];

  for (const char of str) {
    if (isOpenWrap(char)) {
      stack.push(char as OpenWraps);
    } else if (isCloseWrap(char)) {
      // if open wrapper stack is empty and next char is a close wrapper, then str isn't balanced
      if (!stack.length) {
        return false;
      }
      // if the next close wrapper doesn't match the last open wrapper, then str isn't balanced
      if (wraps[stack.pop() as OpenWraps] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

export default isBalanced;