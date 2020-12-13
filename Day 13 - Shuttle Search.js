/** Part 1 */
function day13(input1, input2) {
  var lowestBus = -1;
  var lowestWait = 99999;
  for (var i = 0; i < input2.length; i++) {
    if (input2[i] === "x") {
      continue;
    }
    var busNum = Number(input2[i]);
    var total = busNum;
    while (total < input1) {
      total += busNum;
    }
    if (total - input1 < lowestWait) {
      lowestBus = busNum;
      lowestWait = total - input1;
    }
  }
  console.log(lowestBus + ", wait: " + lowestWait);
}

/** Part 2 */
function day13(unused, input) {
  // Assumes input[0] is never "x"
  var jumpForNext = 1;
  var listStart = Number(input[0]);
  while (true) {
    var good = true;
    for (var i = 0; i < input.length; i++) {
      if (input[i] !== "x") {
        if ((listStart + i) % input[i] === 0) {
          jumpForNext *= input[i]; // (I feel so proud of this)
        } else {
          good = false;
          break;
        }
      }
    }
    if (good) {
      console.log(listStart);
      return;
    }
    listStart += jumpForNext;
    jumpForNext = 1;
  }
}

function deepCopy(input) { return JSON.parse(JSON.stringify(input)); }
function stringContains(inputStr, subStr) { return inputStr.indexOf(subStr) !== -1; }

day13(
//  939, ["7","13","x","x","59","x","31","19"]
//  -1, ["1789","37","47","1889"]
  1007125, ["13","x","x","41","x","x","x","x","x","x","x","x","x","569","x","29","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","19","x","x","x","23","x","x","x","x","x","x","x","937","x","x","x","x","x","37","x","x","x","x","x","x","x","x","x","x","17"]
);
