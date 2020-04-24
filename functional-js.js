'use strict'

/**
 * Javascript versions of some functional programming concepts. Most of these are pure
 * functions because they do not hold a `state` (i.e. does not iterate over index)
 * and also do not mutate any inputs or outputs or global state when called.
 *
 * Note: These functions were written as an exercise on recursion and functional programming.
 * The functionality of many of these already exist as array prototype functions.
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

function map(func, arr) {
  const mapIt = ([current, ...rest], idx) => {
    if (current === undefined) {
      return [];
    }
    return [func(current, idx), ...mapIt([...rest], idx + 1)];
  };
  return mapIt(arr, 0);
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
 * @returns {Array} new array
 */

function reverse([current, ...rest]) {
  if (current === undefined) {
    return [];
  }
  return [...reverse(rest), current];
}

/**
 * Takes an array and returns the last element of that array;
 * @param {Array} arr
 */

function pop(arr) {
  return head(reverse(arr));
}

/**
 * Takes an array and a value to push to end of the list and returns a new array.
 * @param {Array} arr
 * @param {any} val
 * @returns {Array} new array
 */

function push(arr, val) {
  if (val === undefined) {
    return [...arr];
  }
  return [...arr, val];
}

/**
 * Takes any number of arguments after the first array arg and insert it to the
 * beginning of the list.
 * @param {Array} arr 
 * @param  {...any} rest 
 */

function unshift(arr, ...rest) {
  return [...rest, ...arr];
}

/**
 * Takes an array and a callback function to check if any value within the array
 * returns truthy.
 * @param {Function} func
 * @param {Array}
 * @returns {Boolean}
 */

function some(func, [current, ...rest]) {
  if (current === undefined) {
    return false;
  }
  if (func(current)) {
    return true;
  }
  return some(func, rest);
}

/**
 * Takes the first n number of items within an array.
 * @param {Array}
 * @param {*} num 
 */

function first([current, ...rest], num = 1) {
  if (current === undefined || num == 0) {
    return [];
  }
  return [current, ...first(rest, num - 1)];
}

/**
 * Takes the last n number of items within an array.
 * @param {Array} arr 
 * @param {Number} num 
 */

function last(arr, num = 1) {
  return first(reverse(arr), num);
}

/**
 * Takes an array, a value and tries to return the index of the value within
 * the array.
 * @param {Array} arr
 * @param {any} val
 */

function indexOf(arr, val) {
  const idxOf = ([current, ...rest], i) => {
    if (current === undefined) {
      return -1;
    }
    return current === val ? i : idxOf(rest, i + 1);
  };
  return idxOf(arr, 0);
}

/**
 * Takes an array and 2 number index arguments to indicate which indexes to swap values
 * within that array.
 * @param {Array} arr 
 * @param {Number} idx1 
 * @param {Number} idx2 
 */

function swap(arr, idx1, idx2) {
  return map((c, i) => {
    if (i === idx1) {
      return arr[idx2];
    }
    if (i === idx2) {
      return arr[idx1];
    }
    return c;
  }, arr);
}

/**
 * Takes an array and recursively executes an equality check the current value with a value argument.
 * @param {Array}
 * @param {any}
 */

function includes([current, ...rest], value) {
  if (current === undefined) {
    return false;
  }
  return current === value || includes(rest);
}

/**
 * Takes an array and recursively calls the callback function in order to return values that
 * the callback deems truthy.
 * @param {Function} func
 * @param {Array}
 */

function filter(func, [current, ...rest]) {
  if (current === undefined) {
    return [];
  }
  if (func(current)) {
    return [current, ...filter(func, rest)];
  }
  return [...filter(func, rest)];
}

/**
 * Takes an array, coerces all it's values and joins them utilizing a separator argument.
 * @param {Array} arr 
 * @param {String} joinVal 
 */

function join(arr, joinVal = ',') {
  const joinIt = ([current, ...rest], val, curr) => {
    if (current === undefined) {
      return '';
    }
    return curr === length(arr) - 1 ?
      `${current}` :
      `${current}${val}${joinIt(rest, val, curr + 1)}`;
  }
  return joinIt(arr, joinVal, 0)
}

/**
 * Takes an array and recursively calls an internally scoped slice on it. This internal
 * private slice function is passed an additional argument that holds the current index.
 * @param {Array} arr 
 * @param {Number} start 
 * @param {Number} end (optional)
 */

function slice(arr, start, end) {
  const sliceIt = ([current, ...rest], s, e, curr) => {
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
  const spliceIt = ([current, ...rest], s, d, i, curr) => {
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