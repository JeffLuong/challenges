/**
 * Returns associated roman numeral based on arabaic number argument.
 * @param {Number} int 
 */

function mapToRomans(i: number): string {
  switch(i) {
    case 1000:
      return 'M';
    case 500:
      return 'D';
    case 100:
      return 'C';
    case 50:
      return 'L';
    case 10:
      return 'X';
    case 5:
      return 'V';
    default:
      return 'I';
  }
}

/**
 * Converts a number to a roman numeral string
 * @param {number} int 
 */

 function intToRoman(int: number): string {
  // Roman numeral values in int form:
  const romVals = [1, 5, 10, 50, 100, 500, 1000];
  // List of roman numeral values to concat into string:
  // i.e. [100, 100, 50, 1, 1] === 'CCVII'
  const romanInts = [];
  // Current integer - as the loop gets deeper this becomes the current remainder
  let _int = int;
  if (_int === 0) {
    return '';
  }
  // If int is larger and is divisible by 1000 (no remainders) then just push in 1000s
  if ((_int > 1000) && ((_int / 1000) % 1 === 0)) {
    for (let z = 0; z < (_int / 1000); z++) {
      romanInts.push(1000);
    }
  } else {
    // Loop through the roman numeral values in reverse
    for (let i = romVals.length; i >= 0; i--) {
      if (_int === 0) {
        break;
      }
      if (_int >= romVals[i]) {
        // If current int is greater or equal to current roman val
        // get how many of current roman val it needs i.e.: 25 requires two 10s
        const dec = Math.floor(_int / romVals[i]);
        // Remainder of current int and current roman val
        const rem = _int % romVals[i];
        if (rem >= 0) {
          // If remainder is greater or equal to 0, push in the current roman val
          for (let j = 0; j < dec; j++) {
            romanInts.push(romVals[i]);
          }
        }
        // Set the remainder to be the next int to iterate through
        _int = rem;
      }
    }
  }

  return romanInts.map(mapToRomans).join('');
}

/**
 * More recursive way to solve for the same question. Similar in concept as above solution.
 * @param {Number} int 
 */

function _intToRoman(int: number): string {
  function toRoman(i: number, romanVals: number[]): number[] {
    const [curr, ...rest] = romanVals;
    if (curr === undefined || i === 0) {
      return [];
    }
    // Number of times `curr` value needs to be repeated (i.e. 25 requires 2 tens)
    const dec = Math.floor(i / curr);
    // Remainder of the int (i.e. 25 has remainder of 5)
    const rem = i % curr;
    if (i >= curr && rem >= 0 && dec >= 0) {
      const pushedCurr = [];
      for (let j = 0; j < dec; j++) {
        pushedCurr.push(curr);
      }
      return [...pushedCurr, ...toRoman(rem, romanVals)]; // pass in remainder as next int
    }
    return [...toRoman(rem, rest)]; // pass in remainder as next int
  }
  return toRoman(int, [1000, 500, 100, 50, 10, 5, 1])
    .map(mapToRomans)
    .join('');
}