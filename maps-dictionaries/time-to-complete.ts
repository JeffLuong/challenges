#!/usr/bin/env ts-node
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

type Jobs = [number, number, number[]][];

// Input
const jobs: Jobs = [
  [1, 30, [2, 4]],
  [2, 10, [3]],
  [4, 60, []],
  [3, 20, []]
];

type Job = [number, number[]]

type JobMap = {
  [id: string]: Job
}

class JobsManager {
  public jobs: JobMap = {};

  private createJobsMap(jobs: Jobs): JobMap {
    return jobs.reduce((acc: JobMap, [id, ...rest]): JobMap => {
      const _id = id.toString();
      if (!acc[_id]) {
        return {
          ...acc,
          [_id]: rest
        };
      }
      return acc;
    }, {});
  }

  constructor(jobs: Jobs) {
    this.jobs = this.createJobsMap(jobs);
  }

  /**
   * Recursively gets the times of all child jobs of a particular job while
   * also including the job's own time.
   * @param [time, children]
   * @param index map of jobs
   */

  getTimes([time, children]: Job): number[] {
    if (!children.length) {
      return [time];
    }
    return [
      time,
      ...children.reduce((acc: number[], child: number): number[] => {
        const job = this.jobs[child];
        return job ? [...acc, ...this.getTimes(job)] : acc;
      }, [])
    ];
  }

  /**
   * Look up the job with that ID then get all the times associated with it.
   * @param id
   */
  getTimeToCompleteById(id: number | string): number {
    return this.jobs[id] ?
      this.getTimes(this.jobs[id]).reduce((a, c) => a += c, 0) :
      0;
  }
}

const manager = new JobsManager(jobs);

console.log(`
  Job 1: ${manager.getTimeToCompleteById(1)}
  Job 2: ${manager.getTimeToCompleteById(2)}
  Job 3: ${manager.getTimeToCompleteById(3)}
  Job 4: ${manager.getTimeToCompleteById(4)}
`);
