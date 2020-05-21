/**
 * Imperative way of implementing `Promise.all()`. It keeps a count of
 * every promise that gets fulfilled and returns the final resolved array
 * unless there is a rejection - which would break the chain and reject
 * the entire promise wrapper.
 *
 * @param promises
 */
const imperativePromiseAll = (promises: Promise<any>[]): Promise<any[]> => {
  return new Promise<any[]>((res, rej) => {
    const resolved: any[] = [];
    let count = 0;
    promises.forEach((p, i) => {
      p.then(value => {
        resolved[i] = value;
        count += 1;
        if (count === promises.length) {
          res(resolved);
        }
      }).catch(e => rej(e));
    });
  });
};

// Caveats to recursive solution: there may be some uncaught promise rejections
// because of bubbling...
const recursivePromiseAll = ([curr, ...rest]: Promise<any>[]): Promise<any[]> => {
  if (curr === undefined) {
    return Promise.resolve([]);
  }

  return curr
    .then(currRes => {
      return recursivePromiseAll(rest)
        .then(restRes => ([currRes, ...restRes]))
        .catch(e => Promise.reject(e));
    })
    .catch(e => Promise.reject(e));
};
