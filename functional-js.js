/**
 * Javascript versions of some functional programming concepts. Some of these are pure
 * functions because they do not hold a `state` (i.e. does not iterate over index)
 * and also do not mutate any inputs or outputs or global state when called.
 *
 * Note: These functions were written as an exercise on recursion and functional programming.
 * The functionality of these are already array prototype functions.
 */

/**
 * Returns first element in an array.
 * @param {Array}
 */

 function head([first]) {
  return first;
}

/**
 * Returns all elements after the first element in an array.
 * @param {Array}
 */

function tail([, ...rest]) {
  return rest;
}

/**
 * A recursive map function that takes a mapping function and an array.
 * @param {Function} func 
 * @param {Array}
 */

function map(func, [current, ...rest]) {
  if (current === undefined) {
    return [];
  }
  return [func(current), ...map(func, [...rest])];
}

/**
 * A recurisve length function that takes an array and counts how many
 * elements are in an array.
 * @param {Array}
 */

function length([current, ...rest]) {
  if (current === undefined) {
    return 0;
  }
  return 1 + length(rest);
}

/**
 * A recursive reduce function that takes an array and executes a reducer function
 * on each element within the array. When calling recursively, the next inital value
 * is the currently applied reducer function.
 * @param {Function} func 
 * @param {Array}
 * @param {*} initial 
 */

function reduce(func, [current, ...rest], initial = []) {
  if (current === undefined) {
    return initial
  }
  return reduce(func, rest, func(initial, current));
}

/**
 * Takes an array and reverses the order of it. Extract first `current` value and
 * recursively calls `reverse` until there are no more values.
 * @param {Array}
 */

function reverse([current, ...rest]) {
  if (current === undefined) {
    return [];
  }
  return [...reverse(rest), current];
}

/**
 * Takes an array and recursively calls an internally scoped slice on it. This internal
 * private slice function is passed an additional argument that holds the current index.
 * @param {Array} arr 
 * @param {Number} start 
 * @param {Number} end (optional)
 */

function slice(arr, start, end) {
  function sliceIt([current, ...rest], s, e, curr) {
    if (current === undefined || (e && e < curr)) {
      return [];
    }
    return curr < s ?
      [...sliceIt(rest, s, e, curr + 1)] :
      [current, ...sliceIt(rest, s, e, curr + 1)];
  }
  return start === undefined ? arr : sliceIt(arr, start, end, 0);
}

/**
 * Takes a string, a start index, number of elements to delete and an element to insert.
 * @param {Array} arr 
 * @param {Number} start 
 * @param {Number} delCount (optional)
 * @param {any} insert (optional)
 */

function splice(arr, start, delCount = 0, insert) {
  function spliceIt([current, ...rest], s, d, i, curr) {
    if (current === undefined) {
      return i && (s >= curr) ? [i] : [];
    }
    if (curr === s) {
      if (d > 0) {
        return i ?
          [i, ...spliceIt(rest, s, d - 1, null, curr + 1)] :
          [...spliceIt(rest, s, d - 1, null, curr + 1)];
      }
      return i ?
        [i, current, ...spliceIt(rest, s, d, null, curr + 1)] :
        [current, ...spliceIt(rest, s, d, i, curr + 1)];
    }
    return d > 0 && curr > s ?
      [...spliceIt(rest, s, d - 1, i, curr + 1)]:
      [current, ...spliceIt(rest, s, d, i, curr + 1)];
  }
  return spliceIt(arr, start, delCount, insert, 0);
}