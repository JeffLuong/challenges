/**
 * A custom implementation of a promise class.
 * Supports basic functionality available to JS Promises:
 *
 * Supports instance chaining methods:
 *   - instance.then()
 *   - instance.catch()
 *   - instance.finally()
 * 
 * TODO - add support class level methods:
 *   - APromise.all()
 *   - APromise.allSettled()
 *   - APromise.race()
 *   - APromise.reject()
 *   - APromise.resolve()
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
  static FULFILLED = 'fulfilled';

  static REJECTED = 'rejected';

  static PENDING = 'pending';

  noop = () => {};

  __status = '';

  __value?: V | Error = undefined;

  __stateHandlers: StateHandler[] | null = [];

  constructor(callback: (resolve: APromise<V>['resolve'], reject: APromise<V>['reject']) => void) {
    this.__status = APromise.PENDING;
    callback(this.resolve.bind(this), this.reject.bind(this));
  }

  protected __onStateChange(handler: StateHandler): void {
    if (this.__status === APromise.PENDING) {
      (this.__stateHandlers && this.__stateHandlers.push(handler));
    } else {
      if (this.__status === APromise.FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(this.__value);
      }
      if (this.__status === APromise.REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(this.__value as Error);
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
    this.__status = APromise.FULFILLED;
    this.__value = value;
    (this.__stateHandlers && this.__stateHandlers.forEach(this.__onStateChange.bind(this)));
    this.__stateHandlers = null;
  }

  protected __resolve(then: APromise<V>['then'], res: APromise<V>['resolve'], rej: APromise<V>['reject']) {
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
    return this.__value;
  }

  get status() {
    return this.__status
  }

  public done(onFulfilled: OnFulfilled, onRejected: OnRejected, onFinally?: OnFinally) {
    setTimeout(() => {
      this.__onStateChange({ onFulfilled, onRejected, onFinally });
    }, 0);
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
        this.noop,
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
    return new APromise((resolve: APromise<V>['resolve'], reject: APromise<V>['reject']) => {
      return _this.done(
        this.noop,
        this.noop,
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

  public reject(error: Error) {
    this.__status = APromise.REJECTED;
    this.__value = error;
    (this.__stateHandlers && this.__stateHandlers.forEach(this.__onStateChange.bind(this)));
    this.__stateHandlers = null;
  }

  public resolve(value?: V) {
    try {
      const then = this.__getThen(value);
      if (then) {
        this.__resolve(then.bind(value), this.resolve, this.reject);
      }
      this.__fulfill(value)
    } catch(e) {
      this.reject(e);
    }
  }
}