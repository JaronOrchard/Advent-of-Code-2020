/** Part 1 */
function day17(width, height, initialState) {
  var grid = {};
  for (var i = 0; i < initialState.length; i++) {
    var tempKey = (i % width) + "," + Math.floor(i / height) + ",0";
    grid[tempKey] = initialState[i];
  }
  // Run 6 cycles:
  var minX = -(width + 1);
  var maxX = width + 1;
  var minY = -(width + 1);
  var maxY = width + 1;
  var minZ = -(width + 1);
  var maxZ = width + 1;
  for (var cycle = 0; cycle < 6; cycle++) {
    var tempGrid = {};
    for (var x = minX; x <= maxX; x++) {
      for (var y = minY; y <= maxY; y++) {
        for (var z = minZ; z <= maxZ; z++) {
          var activeAdjacentCubes = 0;
          // Check neighbors:
          for (var xIter = -1; xIter <= 1; xIter++) {
            for (var yIter = -1; yIter <= 1; yIter++) {
              for (var zIter = -1; zIter <= 1; zIter++) {
                if (xIter === 0 && yIter === 0 && zIter === 0) {
                  continue; // Ignore self
                }
                var neighborKey = String(x + xIter) + "," + String(y + yIter) + "," + String(z + zIter);
                if (!!grid[neighborKey] && grid[neighborKey] === "#") {
                  activeAdjacentCubes++;
                }
              }
            }
          }
          // Change activation:
          var tempKey = x + "," + y + "," + z;
          var currentlyActive = !!grid[tempKey] && grid[tempKey] === "#";
          if (currentlyActive) {
            if (activeAdjacentCubes >= 2 && activeAdjacentCubes <= 3) {
              tempGrid[tempKey] = "#";
            } else {
              tempGrid[tempKey] = ".";
            }
          } else {
            if (activeAdjacentCubes === 3) {
              tempGrid[tempKey] = "#";
            } else {
              tempGrid[tempKey] = ".";
            }
          }
          // Update bounds if activated:
          if (tempGrid[tempKey] === "#") {
            minX = Math.min(minX, x - 1);
            minY = Math.min(minY, y - 1);
            minZ = Math.min(minZ, z - 1);
            maxX = Math.max(maxX, x + 1);
            maxY = Math.max(maxY, y + 1);
            maxZ = Math.max(maxZ, z + 1);
          }
        }
      }
    }
    grid = deepCopy(tempGrid);
  }
  // Count cubes:
  var finalCount = 0;
  for (var key in grid) {
    if (grid[key] === "#") {
      finalCount++;
    }
  }
  console.log(finalCount);
}

/**
 * Part 2
 * (Same as part 1 but with an extra level of indentation)
 */
function day17(width, height, initialState) {
  var grid = {};
  for (var i = 0; i < initialState.length; i++) {
    var tempKey = (i % width) + "," + Math.floor(i / height) + ",0,0";
    grid[tempKey] = initialState[i];
  }
  // Run 6 cycles:
  var minX = -(width + 1);
  var maxX = width + 1;
  var minY = -(width + 1);
  var maxY = width + 1;
  var minZ = -(width + 1);
  var maxZ = width + 1;
  var minW = -(width + 1);
  var maxW = width + 1;
  for (var cycle = 0; cycle < 6; cycle++) {
    var tempGrid = {};
    for (var x = minX; x <= maxX; x++) {
      for (var y = minY; y <= maxY; y++) {
        for (var z = minZ; z <= maxZ; z++) {
          for (var w = minW; w <= maxW; w++) {
            var activeAdjacentCubes = 0;
            // Check neighbors:
            for (var xIter = -1; xIter <= 1; xIter++) {
              for (var yIter = -1; yIter <= 1; yIter++) {
                for (var zIter = -1; zIter <= 1; zIter++) {
                  for (var wIter = -1; wIter <= 1; wIter++) {
                    if (xIter === 0 && yIter === 0 && zIter === 0 && wIter === 0) {
                      continue; // Ignore self
                    }
                    var neighborKey = String(x + xIter) + "," + String(y + yIter) + "," + String(z + zIter) + "," + String(w + wIter);
                    if (!!grid[neighborKey] && grid[neighborKey] === "#") {
                      activeAdjacentCubes++;
                    }
                  }
                }
              }
            }
            // Change activation:
            var tempKey = x + "," + y + "," + z + "," + w;
            var currentlyActive = !!grid[tempKey] && grid[tempKey] === "#";
            if (currentlyActive) {
              if (activeAdjacentCubes >= 2 && activeAdjacentCubes <= 3) {
                tempGrid[tempKey] = "#";
              } else {
                tempGrid[tempKey] = ".";
              }
            } else {
              if (activeAdjacentCubes === 3) {
                tempGrid[tempKey] = "#";
              } else {
                tempGrid[tempKey] = ".";
              }
            }
            // Update bounds if activated:
            if (tempGrid[tempKey] === "#") {
              minX = Math.min(minX, x - 1);
              minY = Math.min(minY, y - 1);
              minZ = Math.min(minZ, z - 1);
              minW = Math.min(minW, w - 1);
              maxX = Math.max(maxX, x + 1);
              maxY = Math.max(maxY, y + 1);
              maxZ = Math.max(maxZ, z + 1);
              maxW = Math.max(maxW, w + 1);
            }
          }
        }
      }
    }
    grid = deepCopy(tempGrid);
  }
  // Count cubes:
  var finalCount = 0;
  for (var key in grid) {
    if (grid[key] === "#") {
      finalCount++;
    }
  }
  console.log(finalCount);
}

/** ========== Helper functions ========== */
function arrayContains(inputArr, val) { return inputArr.indexOf(val) !== -1; }
function bin2dec(bin) { return parseInt(bin, 2); }
function dec2bin(dec) { return (dec >>> 0).toString(2); }
function deepCopy(input) { return JSON.parse(JSON.stringify(input)); }
function replaceCharAt(inputStr, index, character) { return inputStr.substr(0, index) + character + inputStr.substr(index + 1); }
function stringContains(inputStr, subStr) { return inputStr.indexOf(subStr) !== -1; }
/** ====================================== */

day17(
  //3, 3, ".#...####"
  8, 8, "##.######.##..#..##...#####.#....#########....#####.###..#.#.#.."
);
