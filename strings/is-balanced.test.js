import isBalanced from './is-balanced';

describe('isBalanced()', () => {
  test('throws expected error', () => {
    expect(() => { isBalanced(123); }).toThrow(TypeError);
    expect(() => { isBalanced({}); }).toThrow(TypeError);
    expect(() => { isBalanced([]); }).toThrow(TypeError);
  });

  test('properly evaluates - top level wrappers', () => {
    expect(isBalanced('{}')).toBe(true);
    expect(isBalanced('[]')).toBe(true);
    expect(isBalanced('()')).toBe(true);
  });

  test('properly evaluates', () => {
    expect(isBalanced('{([])}')).toBe(true);
    expect(isBalanced('{something:another()}')).toBe(true);
    expect(isBalanced('{(something:another)}')).toBe(true);
    expect(isBalanced('{(}')).toBe(false);
    expect(isBalanced('}{')).toBe(false);
    expect(isBalanced('{(([{123}])}')).toBe(false);
    expect(isBalanced('')).toBe(false);
  });
});