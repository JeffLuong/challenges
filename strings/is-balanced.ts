function isWrapper(char: string): boolean {
  const wrappers = '(){}[]';
  return wrappers.includes(char);
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

function matchesLastStackChar(char: string, lastChar?: string): boolean {
  switch(lastChar) {
    case '(':
      return char === ')';
    case '{':
      return char === '}';
    case '[':
      return char === ']';
    default:
      return false;
  }
}

function isBalanced(str: string): boolean {
  if (!str || !str.length) {
    return false;
  }

  const stack = [];

  for (const char of str) {
    if (isWrapper(char)) {
      if (isOpenWrap(char)) {
        stack.push(char);
      } else if (matchesLastStackChar(char, stack[stack.length - 1])) {
        stack.pop();
        if (stack.length === 0) {
          return true;
        }
      }
    }
  }
  return false;
}