/**
 * Given a list of jobs, find the total time it will take for it to be complete.
 * Each job will have an ID, a time to complete and a list of child job IDs:
 * jobs = [
 *   [<jobId>, <time>, [<childJobId>, <childJobId>]]
 * ]
 *
 * Each job's time-to-complete must include all of it's children's time-to-complete.
 * Therefore, with a list of jobs like this:
 *
 * jobs = [
 *   [1, 20, [2]],
 *   [2, 30, []]
 * ]
 *
 * Job ID 1's time-to-complete will be 50 because it has a time of 20 + 30
 * (30 being the time from job ID 2)
 *
 */

// Input
const jobs: [number, number, number[]][] = [
  [1, 30, [2, 4]],
  [2, 10, [3]],
  [4, 60, []],
  [3, 20, []]
];

type Job = [number, number[]]

type JobMap = {
  [id: string]: Job
}

/**
 * Recursively gets the times of all child jobs of a particular job while
 * also including the job's own time.
 * @param [time, children]
 * @param index map of jobs
 */

function getTimes([time, children]: Job, index: JobMap): number[] {
  if (!children.length) {
    return [time];
  }
  return [
    time,
    ...children.reduce((acc: number[], child: number): number[] => {
      const job = index[child];
      return job ? [...acc, ...getTimes(index[child], index)] : acc;
    }, [])
  ];
}

/**
 * Creates a mapping of the jobs, then using the jobId arg, look up the job
 * with that ID then get all the times associated with it.
 * @param jobId
 */

function getTimesById(jobId: number): number {
  const jobIndex = jobs.reduce((acc: JobMap, [id, ...rest]): JobMap => {
    const _id = id.toString();
    if (!acc[_id]) {
      return {
        ...acc,
        [_id]: rest
      };
    }
    return acc;
  }, {});
  return jobIndex[jobId] ?
    getTimes(jobIndex[jobId], jobIndex).reduce((a, c) => a += c, 0) :
    0;
}
