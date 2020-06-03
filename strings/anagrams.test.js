import anagrams from './anagrams';

describe('groupAnagrams()', () => {
  it('properly groups anagrams', () => {
    const tests = [
      ['rat', 'tar', 'art', 'well', 'lewl', 'pop', 'opp', 'oops', 'bar'],
      ['abcde', 'treat', 'trate', 'wex', 'abcdef'],
      ['jaijad', 'hgpkjsd', 'asdjfoehajkdfdsa']
    ];
    const results = [
      [
        [ 'rat', 'tar', 'art' ],
        [ 'well', 'lewl' ],
        [ 'pop', 'opp' ],
        [ 'oops' ],
        [ 'bar' ]
      ],
      [['abcde'], ['treat', 'trate'], ['wex'], ['abcdef']],
      [['jaijad'], ['hgpkjsd'], ['asdjfoehajkdfdsa']]
    ];

    tests.forEach((test, i) => {
      expect(anagrams(test)).toEqual(results[i]);
    });
  });

  it('throws expected TypeError', () => {
    const tests = [{}, undefined, null, 123, 'hi', () => {}, [123]];
    tests.forEach(test => {
      expect(() => anagrams(test)).toThrow(TypeError);
    });
  });
});