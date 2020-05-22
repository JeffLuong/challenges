/**
 * A custom implementation of a promise class.
 * Supports basic functionality available to JS Promises:
 *
 * Supports instance chaining methods:
 *   - instance.then()
 *   - instance.catch()
 *   - instance.finally()
 *   - APromise.reject()
 *   - APromise.resolve()
 * 
 * TODO - add support class level methods:
 *   - APromise.all()
 *   - APromise.allSettled()
 *   - APromise.race()
 */

type OnFulfilled = (value: any) => void;
type OnRejected = (error: Error) => void;
type OnFinally = () => void;

type StateHandler = {
  onFulfilled: OnFulfilled
  onRejected: OnRejected,
  onFinally?: OnFinally
};

class APromise<V> {
  private static FULFILLED = 'fulfilled';

  private static REJECTED = 'rejected';

  private static PENDING = 'pending';

  #noop = () => {};

  #status = '';

  #value?: V | Error = undefined;

  #stateHandlers: StateHandler[] | null = [];

  static resolve(value?: any) {
    return new APromise(res => res(value));
  }

  static reject(value?: any) {
    return new APromise((_, rej) => rej(value));
  }

  constructor(callback: (resolve: APromise<V>['resolveIt'], reject: APromise<V>['rejectIt']) => void) {
    this.#status = APromise.PENDING;
    callback(this.resolveIt.bind(this), this.rejectIt.bind(this));
  }

  protected __onStateChange(handler: StateHandler): void {
    if (this.#status === APromise.PENDING) {
      (this.#stateHandlers && this.#stateHandlers.push(handler));
    } else {
      if (this.#status === APromise.FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(this.#value);
      }
      if (this.#status === APromise.REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(this.#value as Error);
      }
      if (handler.onFinally && typeof handler.onFinally === 'function') {
        handler.onFinally();
      }
    }
  }

  protected __getThen(value?: V) {
    if (value instanceof APromise) {
      return value.then;
    }
    return null;
  }

  protected __fulfill(value?: V) {
    this.#status = APromise.FULFILLED;
    this.#value = value;
    (this.#stateHandlers && this.#stateHandlers.forEach(this.__onStateChange.bind(this)));
    this.#stateHandlers = null;
  }

  protected __resolveIt(then: APromise<V>['then'], res: APromise<V>['resolveIt'], rej: APromise<V>['rejectIt']) {
    let done = false;
    try {
      then((value) => {
        if (done) { return; }
        done = true;
        res(value);
      }, (err) => {
        if (done) { return; }
        done = true;
        rej(err);
      });
    } catch(e) {
      if (done) { return; }
      done = true;
      rej(e);
    }
  }

  get value() {
    return this.#value;
  }

  get status() {
    return this.#status
  }

  private done(onFulfilled: OnFulfilled, onRejected: OnRejected, onFinally?: OnFinally) {
    setTimeout(() => {
      this.__onStateChange({ onFulfilled, onRejected, onFinally });
    }, 0);
  }

  private rejectIt(error: Error) {
    this.#status = APromise.REJECTED;
    this.#value = error;
    (this.#stateHandlers && this.#stateHandlers.forEach(this.__onStateChange.bind(this)));
    this.#stateHandlers = null;
  }

  private resolveIt(value?: V) {
    try {
      const then = this.__getThen(value);
      if (then) {
        this.__resolveIt(then.bind(value), this.resolveIt, this.rejectIt);
      }
      this.__fulfill(value)
    } catch(e) {
      this.rejectIt(e);
    }
  }

  public then(onFulfilled: OnFulfilled, onRejected: OnRejected) {
    const _this = this;
    return new APromise((resolve, reject) => {
      return _this.done(
        (value) => {
          if (typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(value));
            } catch(e) {
              return reject(e);
            }
          } else {
            return resolve(value);
          }
        },
        (error) => {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error));
            } catch(e) {
              return reject(e);
            }
          } else {
            return reject(error);
          }
        }
      );
    });
  }

  public catch(onRejected: OnRejected) {
    const _this = this;
    return new APromise((resolve, reject) => {
      return _this.done(
        this.#noop,
        (error: Error) => {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error));
            } catch(e) {
              return reject(e);
            }
          } else {
            return reject(error);
          }
        }
      );
    });
  }

  public finally(onFinally: OnFinally) {
    const _this = this;
    return new APromise((resolve: APromise<V>['resolveIt'], reject: APromise<V>['rejectIt']) => {
      return _this.done(
        this.#noop,
        this.#noop,
        () => {
          if (typeof onFinally === 'function') {
            try {
              onFinally();
              return resolve();
            } catch(e) {
              return reject(e);
            }
          } else {
            return reject(new Error('onFinally callback must be a function.'));
          }
        }
      )
    });
  }
}