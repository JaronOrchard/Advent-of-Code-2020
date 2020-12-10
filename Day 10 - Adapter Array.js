/** Part 1 */
function day09(input) {
  input = input.sort((a,b) => Number(a) - Number(b));
  var jolts = {
    1: 0,
    2: 0,
    3: 0
  };
  var currJolt = 0;
  for (var i = 0; i < input.length; i++) {
    var diff = input[i] - currJolt;
    jolts[diff]++;
    currJolt = input[i];
  }
  jolts[3]++;
  console.log(jolts);
}

/** Part 2 */
var SEEN_CONFIGS = {}
function day09(input) {
  input = input.sort((a,b) => Number(a) - Number(b));
  // Fill up the memoization array by going backwards:
  for (var i = input.length - 1; i >= 0; i--) {
    countAdapterConfigs(input.slice(i), (i === 0 ? 0 : input[i-1]));
  }
  // Report result:
  console.log(countAdapterConfigs(input, 0));
}

function countAdapterConfigs(input, currJolt) {
  if (input.length === 0) {
    return 1;
  }
  if (!!SEEN_CONFIGS[input.join(",")]) {
    return SEEN_CONFIGS[input.join(",")];
  }
  var result;
  
  if (input.length > 2 && input[2] <= currJolt + 3) {
    result = countAdapterConfigs(input.slice(1), input[0])
        + countAdapterConfigs(input.slice(2), input[1])
        + countAdapterConfigs(input.slice(3), input[2]);
  } else if (input.length > 1 && input[1] <= currJolt + 3) {
    result = countAdapterConfigs(input.slice(1), input[0])
        + countAdapterConfigs(input.slice(2), input[1]);
  } else {
    result = countAdapterConfigs(input.slice(1), input[0]);
  }
  SEEN_CONFIGS[input.join(",")] = result;
  return result;
}

function deepCopy(input) { return JSON.parse(JSON.stringify(input)); }
function stringContains(inputStr, subStr) { return inputStr.indexOf(subStr) !== -1; }

day09(
//[16,10,15,5,1,11,7,19,6,12,4]
//[28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3]
[147,174,118,103,67,33,96,28,43,22,16,138,75,148,35,6,10,169,129,115,21,52,58,79,46,7,139,104,91,51,172,57,49,126,95,149,125,123,112,30,78,44,37,167,157,29,173,98,36,63,111,160,18,8,9,159,179,72,110,2,53,150,17,81,97,108,102,56,135,166,168,163,1,25,3,158,101,132,144,45,140,34,156,178,105,68,153,80,82,59,50,122,69,85,109,40,124,119,94,88,13,180,177,133,66,134,60,141]
);
