/**
 * Two arrays are given one of wall positions and the other of wall heights for the
 * associated positions. In between the wall positions should be mud segments. The challenge
 * is to find the tallest height that the mud segments can be - given some assumptions. Example:
 *
 * Given an array of wall positions: [1,3,4,6] with heights of [2,4,3,5] the wall and mud
 * segments can be illustrated like this:
 *
 *                 5
 *        4     4 ___
 *     3 ___ 3 ___| |
 *  2 ___| |___| || |
 * ___| || || || || |
 * | || || || || || |
 * |W||M||W||W||M||W|
 * +-++-++-++-++-++-+
 *
 * `W` denotes a wall while `M` denotes a mud segment. The numbers at the top denote heights.
 * This example's output will be 4.
 *
 * Below are some assumptions:
 * - Both given arrays are always the same length.
 * - Each wall/mud segment cannot be taller than 1 unit compared to its adjacent segments.
 *
 * Some example test cases and expected outputs:
 * Test 1 ::: wPositions [1,2,4,7]          wHeights [4,6,8,11]       // OUTPUT 10
 * Test 2 ::: wPositions [3,1,3,7]          wHeights [3,4,3,3]        // OUTPUT 5
 * Test 3 ::: wPositions [2,1,10]           wHeights [2,1,5]          // OUTPUT 7
 * Test 4 ::: wPositions [1,6,11]           wHeights [4,5,3]          // OUTPUT 7
 * Test 5 ::: wPositions [1,2,3,5,8,10,14]  wHeights [8,9,10,8,6,4,8] // OUTPUT 9
 * Test 6 ::: wPositions [2,8,3,5,10,14,1]  wHeights [9,6,10,8,4,8,8] // OUTPUT 9
 *
 * @param {Array<number>} wPositions 
 * @param {Array<number>} wHeights 
 */

function maxHeight(wPositions: number[], wHeights: number[]): number {
  const walls: { [position: string]: number } = {};
  // Sort positions and heights associated with positions as well as remove duplicates
  for (let i = 1; i <= Math.max(...wPositions); i++) {
    if (wPositions.includes(i) && !walls[i]) {
      walls[i] = wHeights[wPositions.indexOf(i)];
    }
  }

  const positions = Object.keys(walls).map(k => Number.parseInt(k));
  const heights = Object.values(walls);
  const groupedPos = [];
  const groupedHts = [];
  const mudHeights = [];

  // Group positions and heights by pairs. i.e. given positions of [1,6,11,13]
  // group them like so: [[1,6], [6,11], [11,13]]
  for (let i = 0; i < positions.length - 1; i++) {
    if (positions[i + 1]) {
      groupedPos.push([positions[i], positions[i + 1]]);
      groupedHts.push([heights[i], heights[i + 1]]);
    }
  }

  for (let j = 0; j < groupedPos.length; j++) {
    // The number of positions between the current two positions. i.e. given positions
    // of 1 and 6, there are 4 positions between them (2,3,4,5)
    const diff = Math.abs(groupedPos[j][0] - groupedPos[j][1]) - 1;
    const ascHeights = [];
    const descHeights = [];
    // Walk through pairs of heights `diff` amount of times 1 position at a time. i.e.
    // given heights of [5,8] at positions [1,5] walk through 5,6,7 and push those values
    for (let x = diff; x > 0; x--) {
      ascHeights.unshift(groupedHts[j][0] + x);
      descHeights.push(groupedHts[j][1] + x)
    }
    // Compare ascending and descending heights and only select the lowest or equal values
    // between the two.
    for (let y = 0; y < ascHeights.length; y++) {
      if (ascHeights[y] <= descHeights[y]) {
        mudHeights.push(ascHeights[y]);
      } else if (ascHeights[y] > descHeights[y]) {
        mudHeights.push(descHeights[y]);
      }
    }
  }
  // Return the largest value from the list of heights.
  return Math.max(...mudHeights);
}
// maxHeight([1,2,4,7],[4,6,8,11])
// [1,2,4,7]   [1, 2, '3', 4, '5', '6', 7]
// [4,6,8,11]  [4, 6, '7', 8, '9', '10', 11]
// // OUTPUT 10
// maxHeight([3,1,3,7],[3,4,3,3])
// [1,3,7] [1, '2', 3, '4', '5', '6', 7]
// [4,3,3] [4, '4', 3, '4', '5', '4', 3]
// // OUTPUT 5
// maxHeight([2,1,10], [2,1,5])
// [1,2,10] [1, 2, '3', '4', '5', '6', '7', '8', '9', 10]
// [1,2,5]  [1, 2, '3', '4', '5', '6', '7', '7', '6', 5]
// // OUTPUT 7
// maxHeight([1,6,11], [4,5,3]);
// [1,6,11] [1, '2', '3', '4', '5', 6, '7', '8', '9', '10', 11]
// [4,5,3]  [4, '5', '6', '7', '6', 5, '6', '5', '4',  '3', 3]
// // OUTPUT 7
// maxHeight([1,2,3,5,8,10,14], [8,9,10,8,6,4,8]);
// // unsorted: maxHeight([2,8,3,5,10,14,1], [9,6,10,8,4,8,8]);
// [1,2,3,5,8,10,14]  [1, 2, 3,  '4', 5, '6', '7', 8, '9', 10, '11', '12', '13', 14]
// [8,9,10,8,6,4,8]   [8, 9, 10, '9', 8, '8', '7', 6, '5',  4,  '5',  '6',  '7',  8]
// // OUTPUT 9
