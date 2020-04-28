import { isObject } from './utils/object';

/**
 * Takes an object and iterate through a path of keys to set a passed in value.
 * The path of keys is a string that's expecting a dot separation i.e. 'address.state.city'. 
 * @param {Object} obj
 * @param {String} path
 * @param {any} value
 */
function setDeep(obj: object, path: string, value: any): object {
  const keys = path.split('.');
  const lastKey = keys.pop();
  // Create copy of object
  const copy = JSON.parse(JSON.stringify(obj));
  let curr = copy;

  keys.forEach(k => {
    if (curr[k] && isObject(curr[k])) {
      curr = curr[k];
    } else {
      curr[k] = {};
    }
    curr = curr[k];
  });

  // Checking type here to satisfy TS - pop() may return undefined
  if (lastKey) {
    curr[lastKey] = value;
  }
  return copy;
}
