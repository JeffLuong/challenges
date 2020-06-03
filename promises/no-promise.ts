/**
 * Below is an example of another developer using the utility function.
 * Feel free to edit those lines to explore edge cases. (specialy the data)
 */

const testData = [1, 2, 3, 4, 5]

type Data = number[];
type AddOneAsync = (val: number, cb: (newVal: number) => void) => void;
type FinalCb = (results: number[]) => void;

const add1Async: AddOneAsync = (value, callback) => {
  setTimeout(() => {
    callback(value + 1);
  }, Math.random() * 500);
};

const finalCallback: FinalCb = results => {
  console.log(results);
};

/**
 * Let's write an "noPromiseAll" utility function for the team. 
 *
 * Similar to the Array.prototype.map() method, 
 * it would apply a function to each element of the Array,
 * to return a new Array.
 *
 * We don't want to use Promises, only callbacks.
 *
 * We want to have the final callback be execute once all concurrent
 * tasks are complete. The final result should be in the same order as
 * the input order.
 */

// Essentially this is an implementation of Promise.all but with callbacks only.
function noPromiseAll(data: Data, asyncCb: AddOneAsync, finalCb: FinalCb) {
  const finalData: Data = [];
  let count = 0;

  // Loop through data and "resolve" it. After all data is resolved, call final callback.
  data.forEach((value: number, i: number) => {
    const resolve = (newValue: number): void => {
      finalData[i] = newValue;
      count += 1;
      if (count === data.length) {
        finalCb(finalData);
      }
    };
    asyncCb(value, resolve);
  });
};

/**
 * Let's write an "noPromiseSeries" utility function for the team. 
 *
 * Similar to the Array.prototype.map() method, 
 * it would apply a function to each element of the Array,
 * to return a new Array.
 *
 * We don't want to use Promises, only callbacks.
 *
 * We want to call the next concurrent task once the previous one is complete.
 */

function noPromiseSeries(data: Data, asyncCb: AddOneAsync, finalCb: FinalCb) {
  const finalData: Data = [];
  let index = 0;

  const execute = ([value, ...rest]: number[]): void => {
    const resolve = (newVal: number): void => {
      finalData[index] = newVal;
      if (index === data.length - 1) {
        finalCb(finalData);
      } else {
        // After the current call is complete, recursively call next one.
        execute(rest);
      }
      index += 1;
    }
    asyncCb(value, resolve);
  }

  execute(data);
}

/**
 * Let's write an "noPromiseAllLimit" utility function for the team. 
 *
 * Similar to the Array.prototype.map() method, 
 * it would apply a function to each element of the Array,
 * to return a new Array.
 *
 * We don't want to use Promises, only callbacks.
 *
 * We want to limit the number of concurrent tasks at the same time. 
 * We don't want batches. Once a task is done, another one can be started.
 */

function noPromiseAllLimit(data: Data, asyncCb: AddOneAsync, limit: number, finalCb: FinalCb) {
  const finalData: Data = [];
  // Count of how many calls currently made.
  let calls = 0;

  const execute = (value: number, index: number): void => {
    const resolve = (newVal: number): void => {
      finalData[index] = newVal;
      // After resolving, decrement call count.
      calls -= 1;

      if (index === data.length - 1) {
        finalCb(finalData);
      } else if (index >= limit - 1) {
        // After the first initial async calls (in for loop) recursively
        // execute next async call if any previous calls resolves.
        // Example: if limit is 3, after index 2 completes, call next one.
        execute(data[index + 1], index + 1);
      }
    };
    if (calls < limit) {
      calls += 1;
      asyncCb(value, resolve);
    }
  }

  // Initialize the first n (where n is limit - 1) number of async calls.
  for (let i = 0; i < limit; i++) {
    execute(data[i], i);
  }
}

noPromiseAll(testData, add1Async, finalCallback);
noPromiseSeries(testData, add1Async, finalCallback);
noPromiseAllLimit(testData, add1Async, 3, finalCallback)