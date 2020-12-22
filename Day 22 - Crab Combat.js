/** Part 1 */
function day22(p1Deck, p2Deck) {
  while (p1Deck.length > 0 && p2Deck.length > 0) {
    var p1Card = p1Deck[0];
    var p2Card = p2Deck[0];
    p1Deck.splice(0, 1);
    p2Deck.splice(0, 1);
    if (p1Card > p2Card) {
      p1Deck.push(p1Card);
      p1Deck.push(p2Card);
    } else {
      p2Deck.push(p2Card);
      p2Deck.push(p1Card);
    }
  }
  var winningDeck = (p2Deck.length === 0) ? p1Deck : p2Deck;
  var sum = 0;
  for (var i = 0; i < winningDeck.length; i++) {
    sum += winningDeck[winningDeck.length - i - 1] * (i + 1);
  }
  console.log(sum);
}

/** Part 2 */
function day22(p1Deck, p2Deck) {
  recursiveCombat(p1Deck, p2Deck);
  console.log(p1Deck);
  console.log(p2Deck);

  var winningDeck = (p2Deck.length === 0) ? p1Deck : p2Deck;
  var sum = 0;
  for (var i = 0; i < winningDeck.length; i++) {
    sum += winningDeck[winningDeck.length - i - 1] * (i + 1);
  }
  console.log(sum);
}

function recursiveCombat(p1Deck, p2Deck) {
  var initialDeckState = p1Deck.join(",") + "|" + p2Deck.join(",");
  var deckStatesSeen = {};
  deckStatesSeen[initialDeckState] = true;
  
  var roundsSoFar = {};
  while (p1Deck.length > 0 && p2Deck.length > 0) {
    var deckState = p1Deck.join(",") + "|" + p2Deck.join(",");
    deckStatesSeen[deckState] = true;
    if (!!roundsSoFar[deckState]) {
      return "P1";
    }
    roundsSoFar[deckState] = true;
    var p1Card = p1Deck[0];
    var p2Card = p2Deck[0];
    p1Deck.splice(0, 1);
    p2Deck.splice(0, 1);
    if (p1Deck.length >= p1Card && p2Deck.length >= p2Card) {
      var result = recursiveCombat(p1Deck.slice(0, p1Card), p2Deck.slice(0, p2Card));
      if (result === "P1") {
        p1Deck.push(p1Card);
        p1Deck.push(p2Card);
      } else {
        p2Deck.push(p2Card);
        p2Deck.push(p1Card);
      }
    } else {
      if (p1Card > p2Card) {
        p1Deck.push(p1Card);
        p1Deck.push(p2Card);
      } else {
        p2Deck.push(p2Card);
        p2Deck.push(p1Card);
      }
    }
  }
  if (p1Deck.length === 0) {
    return "P2";
  }
  return "P1";
}

/** ========== Helper functions ========== */
// Arrays
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

day22(
  [9,2,6,3,1],
  [5,8,4,7,10]
);

day22(
  [10,39,16,32,5,46,47,45,48,26,36,27,24,37,49,25,30,13,23,1,9,3,31,14,4],
  [2,15,29,41,11,21,8,44,38,19,12,20,40,17,22,35,34,42,50,6,33,7,18,28,43]
);
