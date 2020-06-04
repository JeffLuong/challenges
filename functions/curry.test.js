import { defineCurry, resetPrototype } from './curry';

describe('Function.prototype.curry()', () => {
  beforeEach(() => {
    defineCurry();
  });

  afterEach(() => {
    resetPrototype();
  });

  it('properly curries arguments', () => {
    function lengthyGreeter(name, intro, question) {
      return `Hi ${name}, ${intro}. ${question}?`;
    }

    const tests = [
      lengthyGreeter.curry('Mark', 'My name is Jeff', 'How are you'),
      lengthyGreeter.curry('Mary', 'This is my son Derek', 'Can you look after him'),
      lengthyGreeter.curry('Paul', 'I am free tomorrow', 'Can we meet then')
    ];
    const results = [
      'Hi Mark, My name is Jeff. How are you?',
      'Hi Mary, This is my son Derek. Can you look after him?',
      'Hi Paul, I am free tomorrow. Can we meet then?'
    ];

    tests.forEach((test, i) => expect(test()).toBe(results[i]));
  });
});