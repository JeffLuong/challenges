/**
 * Given a stream() generator function that infinitely returns a random number,
 * the goal of this challenge is to return the mean and median on the set of
 * numbers that have been returned by the generator. Example:
 *
 * // get generated values
 * const numbers = stream();
 *
 * // get fn to calculate mean/median
 * const getMeandian = createMeandian(numbers);
 *
 * getMeandian(); // call should return 1st num from stream
 * getMeandian(); // call should return the [mean, median] for 1st and 2nd nums from stream
 * getMeandian(); // call should return the [mean, median] for 1st, 2nd and 3rd nums from stream
 * ...etc
 */

// Supplied stream generator func
function* stream() {
  while (true) {
    yield Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }
}

function median(vals: number[]): number {
  const sorted = vals.sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[half] + sorted[half - 1]) / 2;
  }
  return sorted[half];
}

function createMeandian(values: IterableIterator<number>): () => [number, number] {
  const data: number[] = [];

  return function() {
    const { value } = values.next();
    data.push(value);

    if (data.length === 1) {
      return [value, value];
    }

    return [
      data.reduce((a, c) => a + c, 0) / data.length,
      median(data)
    ];
  }
}