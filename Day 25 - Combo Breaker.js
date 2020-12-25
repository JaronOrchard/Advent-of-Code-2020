function day25(cardPublicKey, doorPublicKey) {
  var subjectNumber = 7;
  var val = 1;
  var cardLoopSize = 9999999999;
  var doorLoopSize = 9999999999;
  var i = 1;
  while (true) {
    val *= subjectNumber;
    val = val % 20201227;
    if (val === cardPublicKey) {
      cardLoopSize = Math.min(cardLoopSize, i);
      break;
    }
    if (val === doorPublicKey) {
      doorLoopSize = Math.min(doorLoopSize, i);
      break;
    }
    i++;
  }
  
  var startVal;
  var loopSize;
  if (cardLoopSize < 9999999999) {
    subjectNumber = doorPublicKey;
    loopSize = cardLoopSize;
  } else if (doorLoopSize < 9999999999) {
    subjectNumber = cardPublicKey;
    loopSize = doorLoopSize;
  }
  val = 1;
  for (var i = 0; i < loopSize; i++) {
    val *= subjectNumber;
    val = val % 20201227;
  }
  console.log("Encryption key: " + val);
}

/** ========== Helper functions ========== */
// Arrays -- Also remember concat(array), slice( [start,end) ), and splice(index, numToRemove, itemsToAdd...)
function arrayContains(inputArr, val) { return inputArr.indexOf(val) !== -1; }
function arrayIntersection(array1, array2) { return array1.filter(value => array2.includes(value)); }
function removeItemFromArray(inputArr, val) { if (arrayContains(inputArr, val)) { inputArr.splice(inputArr.indexOf(val), 1); } }
// Strings
function replaceCharAt(inputStr, index, character) { return inputStr.substr(0, index) + character + inputStr.substr(index + 1); }
function stringContains(inputStr, subStr) { return inputStr.indexOf(subStr) !== -1; }
// Binary
function bin2dec(bin) { return parseInt(bin, 2); }
function dec2bin(dec) { return (dec >>> 0).toString(2); }
// Other
function deepCopy(input) { return JSON.parse(JSON.stringify(input)); }
/** ====================================== */

day25(5764801,17807724);
day25(17115212,3667832);