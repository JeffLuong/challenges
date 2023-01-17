/**
 * Given a tree of nodes with points and an array of children that are also nodes,
 * return the highest number of points that can be obtained by traversing the tree.
 * 
 * Example:
 *         1
 *        / \
 *       /   \
 *      1     3
 *     / \     \
 *    /   \     \
 *   3    10     5
 */

class Node {
  points: number;
  children: Node[];

  constructor(points: number, children: Node[] = []) {
    this.points = points;
    this.children = children;
  }
}

const tree = new Node(1, [
  new Node(1, [
    new Node(3, []),
    new Node(10, [])
  ]),
  new Node(3, [
    new Node(5, [])
  ])
]);

function findHighestPoints(node: Node): number {
  if (!node.children || node.children.length === 0) {
    return node.points;
  }

  const totalPoints = [];
  for (let i = 0; i < node.children.length; i++) {
    const points = node.points + findHighestPoints(node.children[i]);
    totalPoints.push(points);
  }

  return Math.max(...totalPoints);
}

console.log(findHighestPoints(tree)); // highest is 12
