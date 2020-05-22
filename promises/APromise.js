/**
 * A custom implementation of a promise class.
 */

class APromise {
  static FULFILLED = 'fulfilled';

  static REJECTED = 'rejected';

  static PENDING = 'pending';

  status = null;

  value = null;

  stateHandlers = [];

  constructor(callback) {
    this.status = APromise.PENDING;
    callback(this.resolve.bind(this), this.reject.bind(this));
  }

  __onStateChange(handler) {
    if (this.status === APromise.PENDING) {
      this.stateHandlers.push(handler);
    } else {
      if (this.status === APromise.FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(this.value);
      }
      if (this.status === APromise.REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(this.value);
      }
    }
  }

  __getThen(value) {
    if (value instanceof APromise) {
      return value.then;
    }
    return null;
  }

  __fulfill(value) {
    this.status = APromise.FULFILLED;
    this.value = value;
    this.stateHandlers.forEach(this.__onStateChange.bind(this));
    this.stateHandlers = null;
  }

  __resolve(then, res, rej) {
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

  done(onFulfilled, onRejected) {
    setTimeout(() => {
      this.__onStateChange({ onFulfilled, onRejected });
    }, 0);
  }

  then(onFulfilled, onRejected) {
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

  catch(onRejected) {
    const _this = this;
    return new APromise((resolve, reject) => {
      return _this.done(
        () => {},
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

  reject(error) {
    this.status = APromise.REJECTED;
    this.value = error;
    this.stateHandlers.forEach(this.__onStateChange.bind(this));
    this.stateHandlers = null;
  }

  resolve(value) {
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