/**
 * Given an array of number integers, find all unique numbers (where
 * there is only a single occurrence of a particular number).
 *
 * @param nums 
 */

// Solution using sorted array + comparison
const findUniquesWithSort = (nums: number[]): number[] => {
  if (!nums.length) {
    return [];
  }

  const sorted = nums.sort((a, b) => a - b);
  const uniques = [];
  let cached = null;

  for (let i = 0; i < sorted.length; i++) {
    if (nums[i] === nums[i + 1]) {
      cached = null;
    } else {
      if (cached) {
        uniques.push(cached);
      }
      cached = nums[i + 1];
    }
  }
  return uniques;
};

// Solution using hash map
const findUniquesWithHash = (nums: number[]): number[] => {
  if (!nums.length) {
    return [];
  }

  const map: { [key: string]: number } = {};
  const uniques = [];
  for (const num of nums) {
    if (map[num]) {
      map[num] += 1;
    } else {
      map[num] = 1;
    }
  }

  for (const num in map) {
    if (map[num] === 1) {
      uniques.push(Number(num));
    }
  }
  return uniques;
};