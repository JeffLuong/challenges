/**
 * Given two arrays, return a new array that contain values that are
 * present in both. The function should be able to handle duplications
 * or no duplications.
 *
 * @param arr1
 * @param arr2
 * @param allowDupes
 */

function intersection(arr1: any[], arr2: any[], allowDupes = false): any[] {
  const intersects = arr1.filter(v => arr2.indexOf(v) > -1);

  if (allowDupes) {
    return intersects;
  }
  return Array.from(new Set(intersects));
}

function bruteIntersection(arr1: any[], arr2: any[], allowDupes = false): any[] {
  const intersects: any[] = [];

  arr1.forEach(value => {
    arr2.forEach(_value => {
      if (value === _value) {
        intersects.push(value);
      }
    });
  });

  if (allowDupes) {
    return intersects;
  }
  return Array.from(new Set(intersects));
}