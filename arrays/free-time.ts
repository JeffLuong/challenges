/**
 * Given an array of meetings, a time for the start of the workday, and a time for the end of the workday,
 * find the total number of free time within the workday.
 *
 * Assumptions & expectations:
 *   - Times are given in hours and are in military time (i.e. 1pm is 13th hour)
 *   - Each meeting within the list of meetings is properly formatted in [start, end] times.
 *   - Accomodate for overlapping meetings and meeting times that are out of bounds of workday hours.
 *
 * Example:
 * start of day hour: 9 (9AM)
 * end of day hour: 18 (6PM)
 * meetings = [
 *   [9, 11],  // 2 hour meeting
 *   [10, 12], // 2 hour meeting with 1 hour overlap with previous meeting
 *   [13, 15], // 2 hour meeting
 *   [16, 18]  // 2 hour meeting
 * ]
 *
 * 9 (total hours) - 7 (hours of meetings) = 2
 * Expected output: 2
 *
 */

type Meeting = [number, number];
type Meetings = Meeting[];

function recursiveGetFreeTime(
  [curr, ...rest]: Meetings,
  dayStart: number,
  dayEnd: number,
  maxEnd = 0,
  free = dayEnd - dayStart
): number {
  if (curr === undefined) {
    return free;
  }

  const [start, end] = curr;
  let deduct = 0;

  if (end > maxEnd) {
    if (start < dayStart) {
      deduct += dayStart - start;
    }

    if (end > dayEnd) {
      deduct += end - dayEnd;
    }

    if (start < maxEnd) {
      deduct += maxEnd - start;
    }

    free -= Math.max(maxEnd, end) - start - deduct;
    maxEnd = end;
  }
  return recursiveGetFreeTime(rest, dayStart, dayEnd, maxEnd, free);
}


function imperativeGetFreeTime(meetings: Meetings, dayStart: number, dayEnd: number): number {
  let free = dayEnd - dayStart;

  if (!meetings.length) {
    return free;
  }

  for (let i = 0, maxEnd = 0; i < meetings.length; i++) {
    const [start, end] = meetings[i];
    let deduct = 0;

    if (end > maxEnd) {
      if (start < dayStart) {
        deduct += dayStart - start;
      }

      if (end > dayEnd) {
        deduct += end - dayEnd;
      }

      if (start < maxEnd) {
        deduct += maxEnd - start;
      }

      free -= Math.max(maxEnd, end) - start - deduct;
      maxEnd = end;
    }
  }
  return free;
}