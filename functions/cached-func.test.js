import cachedFunc from './cached-func';

describe('cachedFunc()', () => {
  it('correctly caches executed values', () => {
    let invoked = 0;

    function multiplyTwo(num) {
      invoked += 1;
      return num * 2;
    }

    const multiplyTwoWithCache = cachedFunc(multiplyTwo);

    expect(invoked).toBe(0);
    expect(multiplyTwoWithCache(2)).toBe(4);
    expect(invoked).toBe(1);
    expect(multiplyTwoWithCache(2)).toBe(4);
    expect(invoked).toBe(1);
    expect(multiplyTwoWithCache(3)).toBe(6);
    expect(invoked).toBe(2);
  });
});