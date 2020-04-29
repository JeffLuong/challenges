#!/usr/bin/env ts-node

/**
 * Create an auto-complete feature where given a string, you can get back
 * a list of potential words that may complete the string. For example:
 *
 * Given the string 'app' there could be the following words:
 * ['apple', 'application', 'apply', 'appreciate', ...etc]
 *
 * A pre-requisite for this challenge is to create a dictionary of words
 * so that your `autoComplete()` function can search through it for the
 * available words.
 */

class TNode {
  public end: boolean;
  public char?: string;
  public children: Map<string, TNode>;

  constructor(char?: string) {
    this.end = false;
    this.children = new Map<string, TNode>();
    if (char) {
      this.char = char;
    }
  }
}

class Trie {
  private root: TNode;

  constructor() {
    this.root = new TNode();
  }

  /**
   * Finds the node based on a list of strings, split from the word.
   * @param charArray
   * @param node
   */
  private _findNode([char, ...rest]: string[], node: TNode = this.root): TNode | null {
    if (char === undefined) {
      return node;
    }

    const { children } = node;
    const nextNode = children.get(char);

    if (!nextNode) {
      return null;
    }

    return this._findNode(rest, nextNode);
  }

  /**
   * Public interface of `_findNode()` which is called after splitting the string argument.
   * This is to avoid having to split it recursively within `_findNode()`.
   * @param word
   */
  public findNode(word: string): TNode | null {
    return this._findNode(word.split(''));
  }

  /**
   * Gets all possible words from the Trie from the node argument.
   * Also takes a prefix string to join with the possibilties.
   * @param node
   * @param str
   */
  public getPossibleOptions(node: TNode, str: string): string[] {
    if (node.children.size === 0) {
      return [str];
    }

    const entries = node.children.entries();
    const options: string[] = [];

    for (let i = 0; i < node.children.size; i++) {
      const [char, nextNode] = entries.next().value;
      const args = [...this.getPossibleOptions(nextNode, `${str}${char}`)];
      if (node.end) {
        args.unshift(str);
      }
      options.push(...args);
    };

    return options;
  }

  /**
   * Add a word to the Trie dictionary
   * @param word
   */
  public add(word: string): void {
    let children = this.root.children;
    let letterIdx = 0;

    for (const letter of word) {
      let node = children.get(letter);
      if (!node) {
        node = new TNode(letter);
        children.set(letter, node);
      }

      children = node.children;
      letterIdx += 1;

      if (letterIdx === word.length) {
        node.end = true;
      }
    }
  }

  /**
   * Marks the passed in word as 'not end of word' if it exists.
   * @param word
   */
  public remove(word: string): void {
    const node = this.findNode(word);
    if (node) {
      node.end = false;
    }
  }

  /**
   * Finds the last node of a string - if it is marked as an end of a word,
   * it will return true, otherwise it will be false if it isn't marked or
   * if the node doesn't exist.
   * @param word
   */
  public search(word: string): boolean {
    const node = this.findNode(word);
    return node ? node.end : false;
  }

  /**
   * Returns the potential options from a given string.
   * @param word
   */
  public autoComplete(word: string): string[] {
    const node = this.findNode(word);
    return node && this.getPossibleOptions(node, word) || [];
  }
}

const dictionary = new Trie();

// Some logging tests:
console.log(dictionary.search('apply'));
console.log(dictionary.search('apple'));
console.log(dictionary.search('dictionary'));
console.log(dictionary.search('approach'));

dictionary.add('apply');
dictionary.add('apple');
dictionary.add('application');
dictionary.add('approach');

console.log(dictionary.search('apply'));
console.log(dictionary.search('apple'));
console.log(dictionary.search('application'));
console.log(dictionary.search('approach'));
console.log(dictionary.autoComplete('app'));

dictionary.remove('apply');

console.log(dictionary.search('apply'));