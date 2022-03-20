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
 * list.reverse() // [3,2,1]
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
  add: (value: T) => void;
  deleteNode: (nth: number) => void;
  first: () => Link<T> | undefined;
  has: (value: T) => boolean;
  last: () => Link<T> | undefined;
  reverse: () => LinkedList<T>;
  toArray: () => T[];

  constructor(...args: T[]) {
    if (!args.length) {
      throw new Error('Must construct LinkedList with arguments.');
    }

    const [value, ...values] = args;
    const head = new Link<T>(value);

    const findLink = (val: T, startNode: Link<T>) => {
      let curr: Link<T> | undefined = startNode;

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
      last?.add(val);

      this.last = () => last?.next || head;
    };

    const reduce = (curr: Link<T>) => {
      const arr: T[] = [];
      let tmp = curr;

      while (tmp) {
        arr.push(tmp.value);
        if (tmp.next) {
          tmp = tmp.next;
        } else {
          break;
        }
      }
      return arr;
    };

    const hasVal = (val: T, startNode: Link<T>) => {
      const link = findLink(val, startNode);
      return Boolean(link && link.value === val);
    };

    const deleteNode = (nth: number, startNode?: Link<T>) => {
      if (!startNode) {
        return;
      }

      let tmp: Link<T> | undefined = startNode;

      if (nth === 0) {
        this.first = () => tmp?.next;
        tmp = undefined;
        return;
      }

      let counter = 0;

      while (counter !== nth - 1 && tmp) {
        if (!tmp || !tmp.next) {
          return;
        }

        counter++;
        tmp = tmp.next;
      }
  
      tmp.next = tmp.next?.next;
    };

    // Class method definitions:
    this.has = (val: T) => hasVal(val, head);
    this.last = () => head;
    this.add = (val: T) => addLink(val);
    this.first = () => head;
    this.toArray = () => reduce(head);
    this.deleteNode = (nth: number) => deleteNode(nth, head);
    this.reverse = () => {
      let curr: Link<T> | undefined = head;
      let prev: Link<T> | undefined = undefined;
      let next = curr.next;

      while(curr) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
      }

      // Redefine class methods due to `reverse` of linked list
      this.first = () => prev as Link<T>;
      this.last = () => head;
      this.toArray = () => reduce(prev as Link<T>);
      this.has = (val: T) => hasVal(val, prev as Link<T>);
      this.deleteNode = (nth: number) => deleteNode(nth, prev);
      return this;
    }

    // Initialize linked list
    for (const val of values) {
      addLink(val);
    }
  }
}