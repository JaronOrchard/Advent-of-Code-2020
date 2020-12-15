// Absolutely not efficient.
// This code *barely* completes, even after Chrome
//   says "I'm about to run out of memory" and
//   I say "well keep going anyway".
// [Jack Sparrow] But it *does* complete.
function day15(input) {
  var turn = 1;
  var numbersSpoken = {};
  for (var i = 0; i < input.length; i++) {
    numbersSpoken[input[i]] = [turn];
    turn++;
  }
  var lastNumberSpoken = input[input.length - 1];
  while (true) {
    if (numbersSpoken[lastNumberSpoken].length === 1) {
      numbersSpoken[0].push(turn);
      lastNumberSpoken = 0;
    } else {
      var lastNumberSpokenArray = numbersSpoken[lastNumberSpoken];
      var difference = lastNumberSpokenArray[lastNumberSpokenArray.length - 1] - lastNumberSpokenArray[lastNumberSpokenArray.length - 2]
      if (!numbersSpoken[difference]) {
        numbersSpoken[difference] = [];
      }
      numbersSpoken[difference].push(turn);
      numbersSpoken[difference] = numbersSpoken[difference].slice(-2); // A little bit of cleanup
      lastNumberSpoken = difference;
    }
    
    /** Part 1 */
    console.log("Turn " + turn + " = " + lastNumberSpoken);
    turn++;
    if (turn > 2050) { return; }
    
    /** Part 2 */
    if (turn > 30000000 - 10) {
      console.log("Turn " + turn + " = " + lastNumberSpoken);
    }
    if (turn % 1000000 === 0) { console.log(turn); } // To show progress in 3% increments lol
    turn++;
    if (turn > 30000000 + 10) { return; }
  }
}

/** ========== Helper functions ========== */
function bin2dec(bin) { return parseInt(bin, 2); }
function dec2bin(dec) { return (dec >>> 0).toString(2); }
function deepCopy(input) { return JSON.parse(JSON.stringify(input)); }
function replaceCharAt(inputStr, index, character) { return inputStr.substr(0, index) + character + inputStr.substr(index + 1); }
function stringContains(inputStr, subStr) { return inputStr.indexOf(subStr) !== -1; }
/** ====================================== */

day15(
  //[0,3,6]
  [6,19,0,5,7,13,1]
);
