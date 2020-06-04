import spellcheck from './spell-check';

describe('spellcheck()', () => {
  it('properly returns misspelled words', () => {
    const tests = [
      [['happy', 'birthday', 'to', 'you', 'John'], 'Happy birhday To you john'],
      [['happy', 'birthday', 'to', 'you', 'John'], 'Happy birthday to yo John'],
      [['happy', 'birthday', 'to', 'you', 'John'], 'Hi there John']
    ];
    const results = [
      ['birhday', 'To', 'john'],
      ['yo'],
      ['Hi', 'there']
    ];
    tests.forEach((args, i) => {
      expect(spellcheck(...args)).toEqual(results[i]);
    });
  });
});