import { greedyPrefixCheck, prefixCheckWithMap } from './prefix-check';

const tests = [
  {
    name: 'finds prefix "abc"',
    testCase(checkFunc: Function) {
      return () => {
        expect(checkFunc(['abcd', 'abcep', 'abcqdf', 'abcdd'])).toBe('abc');
      };
    }
  }, {
    name: 'finds no prefix - returns empty string',
    testCase(checkFunc: Function) {
      return () => {
        expect(checkFunc(['eba', 'ae', 'aeon', 'aeape', 'abee'])).toBe('');
      };
    }
  }, {
    name: 'finds no prefix - handles empty strings',
    testCase(checkFunc: Function) {
      return () => {
        expect(checkFunc(['efg', 'efgh', 'efghi', 'efghij', ''])).toBe('');
      };
    }
  }, {
    name: 'finds no prefix - handles empty array',
    testCase(checkFunc: Function) {
      return () => {
        expect(checkFunc([])).toBe('');
      };
    }
  }, {
    name: 'throws error for invalid types - throws on for loop',
    testCase(checkFunc: Function) {
      return () => {
        const expected = ['object', 'object', 'number'];
        [['first', {}], ['second', []], ['third', 1234]].forEach((value, i) => {
          try {
            checkFunc(value);
          } catch(e) {
            expect(e instanceof TypeError).toBe(true);
            expect(e.message).toBe(
              `Invalid type "${expected[i]}" passed into prefix checker. Prefix checker only takes an array of strings.`
            );
          }
        });
      };
    }
  }
];

describe('Prefix checker: greedyPrefixCheck()', () => {
  tests.forEach(({ name, testCase }) => {
    test(name, testCase(greedyPrefixCheck));
  });

  test('throws error for invalid types - throws on first prefix', () => {
    [[{}], [[]], [1234]].forEach(value => {
      const test = () => { greedyPrefixCheck(value as any); };
      expect(test).toThrow(TypeError);
    });
  });
});

describe('Prefix checker: prefixCheckWithMap()', () => {
  tests.forEach(({ name, testCase }) => {
    test(name, testCase(prefixCheckWithMap));
  });
});