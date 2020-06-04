/**
 * Create a function that caches (internally) any function returns to
 * avoid executing the same function to get the same results. Example:
 *
 * function greeter(name) {
 *   return `Hi, ${name}`;
 * }
 *
 * const greetPeople = cachedFunc(greeter);
 *
 * 1st call:
 * greetPeople('Mark') // => 'Hi Mark'
 *
 * 2nd call:
 * greetPeople('Mark') // => 'Hi Mark' from cache
 *
 * @param fn 
 */

type CachedFunc = (args: any) => any;

function cachedFunc(fn: Function): CachedFunc {
  const cache: { [key: string]: any } = {};

  return (...args: any[]) => {
    // Tricky part is that there may be no arguments passed,
    // resulting in '' (empty string) keys.
    const key = args.slice().join('');

    if (cache[key]) {
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  }
}

export default cachedFunc;