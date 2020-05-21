/**
 * Implementation of `Promise.allSettled()` which takes an array of promises
 * and returns a new promise containing all fulfilled and rejected results
 * of each promise in the array.
 */

type PromiseResult = {
  status: string,
  reason?: string | Error
  value?: any
};

const promiseAllSettled = (promises: Promise<any>[]): Promise<any[]> => {
  return new Promise<any[]>(resolve => {
    const resolved: any[] = [];
    let count = 0;
    const handleResponse = (result: PromiseResult, index: number): void => {
      resolved[index] = result;
      count += 1;
      if (count === promises.length) {
        resolve(resolved);
      }
    };

    promises.forEach((promise, i) => {
      promise
      .then(value => handleResponse({ value, status: 'fulfilled' }, i))
      .catch(reason => handleResponse({ reason, status: 'rejected' }, i));
    });
  });
};