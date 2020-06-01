/**
 * Implement a HashMap class without using JavaScript’s built-in objects ({}) or Maps.
 * You are provided a hashIt() function that takes a string and returns a number
 * (the numbers are mostly unique, but sometimes two different strings will return the
 * same number).
 *
 * Your HashMap should support just 2 methods, get, set:
 *
 * let map = new HashMap
 * map.set('abc', 123)    // undefined
 * map.set('foo', 'bar')  // undefined
 * map.set('foo', 'baz')  // undefined
 * map.get('abc')         // 123
 * map.get('foo')         // 'baz'
 * map.get('def')         // undefined
 */

class HashMap {
  get: (key: string) => any;

  set: (key: string, value: any) => void;

  entries: () => void;

  constructor() {
    // Using `Object.create()` with `null` to create a 'pure' data map
    // that doesn't inherit any object prototype properties.
    const map = Object.create(null);
    // Provided hashing function
    const hashIt = (string: string): number => {
      return string
        .split('')
        .reduce((a, b) => ((a << 5) + a) + b.charCodeAt(0), 5381)
    };

    this.get = (key: string) => {
      return map[hashIt(key)][1];
    };

    // Structure of the hash is:
    // {
    //   '123419': ['key1', <value>],
    //   '235196': ['key2', <value>],
    //   ...
    // }
    this.set = (key: string, value: any) => {
      map[hashIt(key)] = [key, value];
    };

    this.entries = function* () {
      let entry = null;
      for (const entry in map) {
        yield map[entry];
      }
      return entry;
    };
  }
}