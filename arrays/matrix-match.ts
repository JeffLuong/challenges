/**
 * Given a matrix of strings, check if the letters match in both
 * vertically and horizontally. The assumptions for this challenge are:
 *   - the matrix is always square (same length vertically and horizontally)
 *   - the matrix always contains string letters
 * 
 * Example:
 *
 * Input: matrix = [
 *   ['C', 'A', 'T'],
 *   ['A', 'T', 'E'],
 *   ['T', 'E', 'C']
 * ]
 *
 * Output: true
 */

// O(n^2) recursive solution where n is the length of the matrix
function checkMatrixMatch(matrix: string[][], index: number = 0): boolean {
  if (matrix.length === index) {
    return true;
  }

  for (let j = 0; j < matrix.length; j++) {
    const horiz = matrix[index][j];
    const verti = matrix[j][index];
    if (horiz !== verti) {
      return false;
    }
  }

  return checkMatrixMatch(matrix, ++index);
}

// O(n^2) solution with 1 while loops
function isMatrixMatchWhile(matrix: string[][]): boolean {
  let outerIdx = 0;
  let innerIdx = 0;

  while (outerIdx < matrix.length && innerIdx < matrix.length) {
    const horiz = matrix[outerIdx][innerIdx];
    const verti = matrix[innerIdx][outerIdx];

    if (horiz !== verti) {
      return false;
    }

    if (innerIdx === matrix.length - 1) {
      outerIdx += 1;
      innerIdx = 0;
    } else {
      innerIdx += 1;
    }
  }
  return true;
}

// O(n^2) solution with 2 for loops
function isMatrixMatchFor(matrix: string[][]): boolean {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      const horiz = matrix[i][j];
      const verti = matrix[j][i];

      if (horiz !== verti) {
        return false;
      }
    }
  }
  return true;
}