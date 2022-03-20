export const bucketSort = (arr: number[], bucketSize = 5) => {
  // NOTE: bucketSize is the size of each bucket in index:
  // (i.e. if bucketSize is 2, then bucket has length of 3)
  if (arr.length === 0) {
    return arr;
  }

  // Get max and min values of within the array
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  // Set up how many buckets to group values together
  // Number of buckets can be somewhat arbitrary
  const numOfBuckets = Math.floor((max - min) / bucketSize) + 1;
  const buckets: number[][] = new Array(numOfBuckets);
  // Create buckets
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  };
  // Push values into the appropriate buckets
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    buckets[Math.floor((value - min) / bucketSize)].push(value);
  };

  return buckets.reduce((acc, curr) => [...acc, ...curr.sort()], []);
};
