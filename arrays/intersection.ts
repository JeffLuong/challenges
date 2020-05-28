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
  } else {
    return Array.from(new Set(intersects));
  }
}