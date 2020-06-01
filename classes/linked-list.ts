/**
 * Implement a LinkedList class without using JavaScript’s built-in arrays ([]).
 * The LinkedList should support just a few methods, add, has, first, last and toArray:
 *
 * let list = new LinkedList(1, 2, 3)
 * list.add(4)    // undefined
 * list.add(5)    // undefined
 * list.has(1)    // true
 * list.has(4)    // true
 * list.has(6)    // false
 * list.first()   // { value: 1 }
 * list.last()    // { value: 3 }
 * list.toArray() // [1,2,3]
 */

class Link<T> {
  next?: Link<T> | undefined;

  value: T;

  constructor(value: T) {
    this.next = undefined;
    if (value) {
      this.value = value;
    } else {
      throw new Error('class Link must be initialized with a value');
    }
  }

  add(nextValue: T) {
    this.next = new Link<T>(nextValue);
  }
}

class LinkedList<T> {
  has: (value: T) => boolean;
  add: (value: T) => void;
  first: () => Link<T>;
  last: () => Link<T>;
  toArray: () => T[];

  constructor(...args: T[]) {
    if (!args.length) {
      throw new Error('Must construct LinkedList with arguments.');
    }

    const [value, ...values] = args;
    const head = new Link<T>(value);

    const findLink = (val: T) => {
      let curr: Link<T> | undefined = head;

      while (curr) {
        if (curr.value === val) {
          break;
        } else {
          curr = curr.next;
        }
      }
      return curr;
    };

    const addLink = (val: T) => {
      const last = this.last();
      last.add(val);

      this.last = () => last.next || head;
    };

    const reduce = () => {
      const arr: T[] = [];
      let curr = head;

      while (curr) {
        arr.push(curr.value);
        if (curr.next) {
          curr = curr.next;
        } else {
          break;
        }
      }
      return arr;
    };

    // Method defined within constructor to privatize initial `value`
    this.has = (val: T) => {
      const link = findLink(val);
      return Boolean(link && link.value === val);
    };

    this.last = () => head;

    // Method defined within constructor to privatize initial `value`
    this.add = (val: T) => {
      addLink(val);
    };

    this.first = () => head;

    this.toArray = () => reduce();

    for (const val of values) {
      addLink(val);
    }
  }
}