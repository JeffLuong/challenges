/**
 * Given a start point and a table grid of 0 & 1, a "group" is considered when all 1s
 * are adjacent to each other horizontally and/or vertically.
 *
 * The goal of this challenge is to find the "perimeter" of a group, from a start point.
 * The perimeter consists of all 0s that surround the "group" horizontally and vertically -
 * not diagonally.
 *
 * Example:
 *
 * start = { x: 1, y: 0 };
 * grid = [
 *  [0, 0, 0],
 *  [1, 1, 0],
 *  [0, 0, 0]
 * ]
 *
 * The output of the above will be 5 because there are five 0s around the 1 in the start point.
 * See below for clearer explanation. The Xs mark the perimeter is:
 *
 * grid = [
 *  [x, x, 0],
 *  [1, 1, x],
 *  [x, x, 0]
 * ]
 *
 */

const start = {
  x: 2,
  y: 1
};

const grid = [
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [1, 1, 1, 0],
  [0, 0, 0, 0]
];

function calculatePerimeter(table, startPoint) {
  // Keep track of what positions were already checked so as
  // to not re-evaluate them.
  const checkedPoints = {};

  function isChecked(x, y) {
    return checkedPoints[x] && checkedPoints[x][y];
  }

  function findPerimeter(point) {
    const { x, y } = point;

    // Mark current point as checked.
    if (checkedPoints[x] && !checkedPoints[x][y]) {
      checkedPoints[x][y] = true;
    } else if (!checkedPoints[x]) {
      checkedPoints[x] = { [y]: true };
    }

    // If this point has a 0 value, stop evaluating adjacents
    // and return this position as a perimeter.
    if (table[x][y] === 0) {
      return [point];
    }

    const adjacents = [];

    // Ensure adjacent values are in-bounds.
    if (x < table.length - 1) {
      adjacents.push({ x: x + 1, y });
    }
    if (x > 0) {
      adjacents.push({ x: x - 1, y });
    }
    if (y > 0) {
      adjacents.push({ x, y: y - 1 });
    }
    if (y < table[0].length - 1) {
      adjacents.push({ x, y: y + 1 });
    }

    // Continue to evaluate the adjacent points.
    return adjacents.reduce((a, p) => {
      // If the point is already checked, don't recursively evaluate.
      if (!isChecked(p.x, p.y)) {
        a.push(...findPerimeter(p));
      }
      return a;
    }, []);
  }
  return findPerimeter(startPoint, table).length;
}