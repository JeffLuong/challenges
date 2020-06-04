/**
 * Implement currying as a function prototype.
 * What is currying?
 * - https://fr.umio.us/favoring-curry/
 * - https://javascriptweblog.wordpress.com/2010/04/05/curry-cooking-up-tastier-functions/
 *
 *  Example:
 *
 *  function lengthyGreeter(name, intro, question) {
 *    return `Hi ${name}, ${intro}. ${question}?`;
 *  }
 *
 *  const greetMark = lengthyGreeter.curry('Mark', 'My name is Jeff', 'How are you');
 *  const greetMary = lengthyGreeter.curry('Mary', 'This is my son', 'Can you look after him');
 *
 *  greetMark() // 'Hi Mark, My name is Jeff. How are you?'
 *  greetMary() // 'Hi Mary, This is my son. Can you look after him?'
 */

function defineCurry() {
  Function.prototype.curry = function(...args) {
    if (!args.length) {
      return this;
    }
    // function scope (in case of example below, this will be `lengthyGreeter()`)
    const self = this;
    return function(...curried) {
      const combined = [...args, ...curried];
      // `this` will be the returned function scope callsite (depending where it is called,
      // it can be the global scope or within an object or another function.)
      return self.apply(this, combined);
    };
  }
}

function resetPrototype() {
  Function.prototype.curry = undefined;
}

export { defineCurry, resetPrototype };