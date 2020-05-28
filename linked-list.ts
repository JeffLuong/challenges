/**
 * Implement a LinkedList class without using JavaScript’s built-in arrays ([]).
 * The LinkedList should support just 2 methods, add and has:
 *
 * let list = new LinkedList(1, 2, 3)
 * list.add(4) // undefined
 * list.add(5) // undefined
 * list.has(1) // true
 * list.has(4) // true
 * list.has(6) // false
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

  constructor(...args: T[]) {
    if (!args.length) {
      throw new Error('Must construct LinkedList with arguments.');
    }

    const [value, ...values] = args;
    const head = new Link<T>(value);

    const findLink = (val: T) => {
      let curr: Link<T> | undefined = head;
      let link = null;

      while (curr) {
        if (curr.value === val) {
          link = curr;
          break;
        } else {
          curr = curr.next;
        }
      }
      return link;
    };

    const findLast = () => {
      let curr = head;

      while (curr.next) {
        curr = curr.next;
      }
      return curr;
    };

    const addLink = (val: T) => {
      const last = findLast();
      last.add(val);
    };

    // Method defined within constructor to privatize initial `value`
    this.has = (val: T) => {
      const link = findLink(val);
      return Boolean(link && link.value === val);
    };

    // Method defined within constructor to privatize initial `value`
    this.add = (val: T) => {
      addLink(val);
    };

    for (const val of values) {
      addLink(val);
    }
  }
}