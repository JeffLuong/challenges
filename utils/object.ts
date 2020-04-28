/**
 * Checks if the passed in argument is an object
 * @param {any} o
 */

export function isObject(o: any): boolean {
  return o.constructor.name === 'Object';
}