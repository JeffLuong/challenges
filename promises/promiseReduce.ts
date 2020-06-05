/**
 * Given an array of asynchronous tasks, a function and an initial array,
 * create a reduce function that only continues to the next once the current
 * task is resolved.
 *
 * @param param
 * @param func
 * @param init
 */

type ConcurrentTasks = () => Promise<any>;

type PReduce = (
  arr: ConcurrentTasks[],
  reducer: (init: Promise<any>, val: any) => Promise<any>,
  init: Promise<any>
) => Promise<any>;

const promiseReduce: PReduce = ([curr, ...rest], func, init) => {
  const _init = init || [];

  if (curr === undefined) {
    return _init;
  }

  return curr().then(value => {
    return promiseReduce(rest, func, func(_init, value));
  })
}
