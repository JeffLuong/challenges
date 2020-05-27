/**
 * The goal is to create a class with a privately scoped value that is
 * only accessible if calling a getter function. If no value is provided,
 * it should initialize with a default value.
 * 
 * Example:
 *
 * const mClass = new MyClass();
 * mClass.value         // undefined
 * mClass.getValue()    // 5 (default initialized value)
 * mclass.setValue(3)   // 3
 * mClass.addToValue(2) // 5 (adds 2 to current private value)
 */

type Getter = () => number;
type Setter = (value: number) => void;
type Adder = (num: number) => number;

// ES6 class example:
class PrivacyClass {
  getValue: Getter;

  setValue: Setter;

  constructor(value = 5) {
    this.getValue = () => {
      return value;
    };

    this.setValue = (val) => {
      this.getValue = () => {
        return val;
      };
    };
  }

  addToValue: Adder = val => this.getValue() + val;
}

type PFType = {
  getValue: Getter,
  setValue: Setter,
  addToValue: Adder
};

// Function class
function PrivacyFunc(this: PFType, value: number): PFType {
  this.getValue = () => {
    return value;
  };

  this.setValue = (val) => {
    this.getValue = () => {
      return val;
    };
  };

  this.addToValue = val => this.getValue() + val;

  return this;
}