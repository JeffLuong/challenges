import { isObject } from './utils/object';

type Dictionary = {
  // Can't figure out a good way to type this since the data structure
  // is either a recursive `Dictionary` type or number...
  [letter: string]: any,
 } | any;

const dictionary: Dictionary = {};

function addToDictionary(str: string, dic: Dictionary): Dictionary {
  const arr = str.split('');
  let currNode = dic;

  for (let i = 0; i < arr.length; i++) {
    if (!currNode[arr[i]]) {
      currNode[arr[i]] = (i === arr.length - 1) ? 1 : {};
    } else if (!isObject(currNode[arr[i]])) {
      currNode[arr[i]] = { end: 1 };
    } else if (isObject(currNode[arr[i]]) && i === arr.length - 1) {
      currNode[arr[i]] = { end: 1, ...(currNode[arr[i]] as object) };
    }
    currNode = currNode[arr[i]];
  }
  return dic;
}

function dive(node: Dictionary, str: string = ''): string[] {
  if (!node || node === 1) {
    return [str];
  }
  const letters = Object.keys(node).filter(k => k !== 'end');
  const res: string[] = [];
  letters.forEach(l => {
    const args = [...dive(node[l], `${str}${l}`)];
    if (node.end) {
      args.unshift(`${str}`);
    }
    res.push(...args);
  });
  return res;
}

function search(str: string, dic: Dictionary) {
  const arr = str.split('');

  if (!arr.length || !dic) {
    return [];
  }

  let currNode = dic;

  for (let i = 0; i < arr.length; i++) {
    const node = currNode[arr[i]];
    if (!node) {
      break;
    } else if (isObject(node)) {
      currNode = node;
    } else if (node === 1) {
      currNode = null;
    }
  }
  return [...dive(currNode, str)];
}

function autoComplete(str: string): string[] {
  return search(str, dictionary);
}