var tiles;
function day24(input) {
  tiles = {};
  var minX = 0;
  var maxX = 0;
  var minY = 0;
  var maxY = 0;
  for (var i = 0; i < input.length; i++) {
    var instructions = input[i];
    var x = 0;
    var y = 0;
    while (instructions.length > 0) {
      if (instructions.startsWith("e")) {
        x += 2;
        instructions = instructions.substr(1);
      } else if (instructions.startsWith("w")) {
        x -= 2;
        instructions = instructions.substr(1);
      } else if (instructions.startsWith("ne")) {
        x += 1;
        y += 1;
        instructions = instructions.substr(2);
      } else if (instructions.startsWith("nw")) {
        x -= 1;
        y += 1;
        instructions = instructions.substr(2);
      } else if (instructions.startsWith("se")) {
        x += 1;
        y -= 1;
        instructions = instructions.substr(2);
      } else if (instructions.startsWith("sw")) {
        x -= 1;
        y -= 1;
        instructions = instructions.substr(2);
      }
    }
    var coord = x + "," + y;
    minX = Math.min(minX, x - 2);
    maxX = Math.max(maxX, x + 2);
    minY = Math.min(minY, y - 1);
    maxY = Math.max(maxY, y + 1);
    if (!tiles[coord] || tiles[coord] === "WHITE") {
      tiles[coord] = "BLACK";
    } else {
      tiles[coord] = "WHITE";
    }
  }
  count = 0;
  for (var key in tiles) {
    if (tiles[key] === "BLACK") {
      count++;
    }
  }
  console.log("Part 1 count: " + count);
  
  for (var day = 0; day < 100; day++) {
    var tempTiles = deepCopy(tiles);
    for (var y = minY; y <= maxY; y++) {
      var startX = minX;
      var endX = maxX;
      // x is even when y is even
      // x is odd when y is odd
      // Contrary to my assumptions, -1 % 2 is not 1.  Argh.
      if (Math.abs(y % 2) !== Math.abs(startX % 2)) { startX--; }
      if (Math.abs(y % 2) !== Math.abs(endX % 2)) { endX++; }
      for (var x = startX; x <= endX; x += 2) {
        var adjacentBlackTiles = countSurroundingBlackTiles(x, y);
        var coord = x + "," + y;
        if (!!tiles[coord] && tiles[coord] === "BLACK") {
          if (adjacentBlackTiles === 0 || adjacentBlackTiles > 2) {
            tempTiles[coord] = "WHITE";
          }
        } else { // White
          if (adjacentBlackTiles === 2) {
            tempTiles[coord] = "BLACK";
            minX = Math.min(minX, x - 2);
            maxX = Math.max(maxX, x + 2);
            minY = Math.min(minY, y - 1);
            maxY = Math.max(maxY, y + 1);
          }
        }
      }
    }
    tiles = deepCopy(tempTiles);
  }
  count = 0;
  for (var key in tiles) {
    if (tiles[key] === "BLACK") {
      count++;
    }
  }
  console.log("Part 2 count: " + count);
}

function countSurroundingBlackTiles(x, y) {
  var count = 0;
  var w = (x-2) + "," + y;
  var e = (x+2) + "," + y;
  var nw = (x-1) + "," + (y+1);
  var ne = (x+1) + "," + (y+1);
  var sw = (x-1) + "," + (y-1);
  var se = (x+1) + "," + (y-1);
  
  if (!!tiles[w] && tiles[w] === "BLACK") { count++; }
  if (!!tiles[e] && tiles[e] === "BLACK") { count++; }
  if (!!tiles[nw] && tiles[nw] === "BLACK") { count++; }
  if (!!tiles[ne] && tiles[ne] === "BLACK") { count++; }
  if (!!tiles[sw] && tiles[sw] === "BLACK") { count++; }
  if (!!tiles[se] && tiles[se] === "BLACK") { count++; }
  return count;
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

day24(
  [
    "sesenwnenenewseeswwswswwnenewsewsw",
    "neeenesenwnwwswnenewnwwsewnenwseswesw",
    "seswneswswsenwwnwse",
    "nwnwneseeswswnenewneswwnewseswneseene",
    "swweswneswnenwsewnwneneseenw",
    "eesenwseswswnenwswnwnwsewwnwsene",
    "sewnenenenesenwsewnenwwwse",
    "wenwwweseeeweswwwnwwe",
    "wsweesenenewnwwnwsenewsenwwsesesenwne",
    "neeswseenwwswnwswswnw",
    "nenwswwsewswnenenewsenwsenwnesesenew",
    "enewnwewneswsewnwswenweswnenwsenwsw",
    "sweneswneswneneenwnewenewwneswswnese",
    "swwesenesewenwneswnwwneseswwne",
    "enesenwswwswneneswsenwnewswseenwsese",
    "wnwnesenesenenwwnenwsewesewsesesew",
    "nenewswnwewswnenesenwnesewesw",
    "eneswnwswnwsenenwnwnwwseeswneewsenese",
    "neswnwewnwnwseenwseesewsenwsweewe",
    "wseweeenwnesenwwwswnew"
  ]
);

day24(
  [
    "swswswnwnweseseseenwwswsenewseseseswsw",
    "nwwsweswswseswswswwwwswwswwswew",
    "ewswnesenenwenenesenenenwnewe",
    "newsewneesewseseeseseseesewewsese",
    "enwseewneeesweeeenwesenewsene",
    "nwnwnwnwsenwnwswnwnwnwnwenenenwnwnwneww",
    "swswswwwswswseswseeese",
    "seesewseeseseeeseseesesese",
    "eeeneneeneeeewneseeenenenweew",
    "seseeseseseeenweseswsesewewsesesenene",
    "nwnenenwwnenwswsenwnenwsenwnwsewseswnene",
    "nwnwnwneswnwsenwnwwnwswnwnwnwenwnwnwe",
    "swwswswwsweswswswswwswswsw",
    "wseseeseseneswenweseweesenweswe",
    "nwneenwnenwnwnwseswnenwnwseswnenenwnwwne",
    "seseswswwswswswwswnesenwswseswswneeswswsw",
    "swsenenenwswseneswswswwwnwswwesewenw",
    "swnewneeeweeenenwneeeseeewew",
    "esesenwswnwsenwswswseswnweswsenwseee",
    "swnwneswswnwswsesweseenwsweswnwswswsw",
    "eswswnwesewwnenesesenewneweswwswsw",
    "nwneneneneneneseneeneneeeneswnenenewe",
    "eneneswsenwsweneswnwneswnenenewnenenwswe",
    "ewwwwwewwwwwswwwswwwnwsw",
    "seeseseenweeeneeseeeseswesesesw",
    "neeeneneeenenwseneswwnwnenweneneswe",
    "wwneenwwnweweneeeswewseseneee",
    "nwnwwwwsewnwwwnwnenwnwwnww",
    "sewweneeneneewnwnenenenenesenesew",
    "wwswnwnewwwwnwnww",
    "wwswwwweswsenwne",
    "swneewnweseseenwseeeseeseseesenwne",
    "ewesenweeeseswnwese",
    "sesweenweseseseswenweseseseseeseee",
    "seseseseseeeseeseewswsenenwsesesese",
    "eenwsweswnwwnwnwswswswswseswswswswswsw",
    "eeseeeeswseeenenweeeeeee",
    "nwwwwwnwnwnwnwswwenwnw",
    "eneswsenweesenwseesweseswewwseee",
    "eeeweeseesene",
    "wwnwnesewnwnwwwwnwenwnwnewsenwnwnw",
    "eseeeswneeeeeenwneenee",
    "neneneneneneneewnenwnenwne",
    "seswsenwseseswseseswswsewnesesesesesese",
    "neesenwseswsesesesenwswsw",
    "swnweweweseneseeweswnwsewswnenwsw",
    "neswneneswewwnwseseswseesesesesesenesw",
    "swnwnenwnenwnenwnwneseenesewnenenenese",
    "sesenwseswsesesenwsweseswwswswsesese",
    "neeseswswseseneeenesesesewesenewsese",
    "swnwnwwswnwweneenwwswnenewenwsese",
    "esenwnenenenewseswneene",
    "eneswnwweswnwwwnwnwwswenwwseene",
    "sesenewsenwswwseeesenwseesewswsenenwne",
    "nenwnenwnenenenwsenenewnenene",
    "sewwwswwwwwsewnewwwwwnewnew",
    "nwneneneneswnewwneenenesenwwneneseene",
    "seeeseseseseseseseeesewesese",
    "newnesewnesewswnewwwsesewenewnwnwsw",
    "eseswseseseneseswsesew",
    "wewnwswswwswswswswwwwwsw",
    "eseseeseeswesenwsese",
    "wnwenwwnewwwnwwswwwwsewnw",
    "wsenwnwnenwwwsenwwnewswwwwsenenwww",
    "wswnwsenenwwnwseewwwswnenwnewww",
    "seeeneenesweeesweenw",
    "eeswnewwnweneneseneeneenesee",
    "sesenesesesesesenwsesesesesenwsesesesesesw",
    "wswnenenesewneseenwnwewweewsew",
    "swnwneneeeeeneeeneweenweneswe",
    "seeeseeweeeewneeseesenwseseee",
    "sesesesesesenesesesesenwseseseseseseseswnw",
    "neseeeeeeeweswseeeeeewsee",
    "nwnwnwnwnwwswnwwnwnweswsenwnwweenw",
    "wnwnwwnenwwnwnwnenwnwnwsesesenenenenwnw",
    "senesesesesesesesesesesesesewse",
    "swswseswswseneswswenwswsenwwswsenwswsw",
    "neneeeeneeeeeswneeeenene",
    "nenwneneseneneneseswnenwneenenewnesenene",
    "swswneneneneweseenene",
    "wenwsenewnewnwsenwenwwswswswswseswsenw",
    "wneswwnwewewwwwwswswwwwww",
    "sewsenwseseseneneseseseseswswseswseesese",
    "nenenenwseeeeneneneesw",
    "seseseeesewnwsweeseseeseesewenesese",
    "swnweseeswwwswswnw",
    "nwewewwnwswswwwswweswswswwneswsw",
    "nwneneeneneeswwswsenwseneswnwswnewnene",
    "seneneeseswesewswswswnwwswswnwnwseswnew",
    "seseswsewswsesenwswsesesesesesesewnesenesw",
    "wwenwnwwnwsenwnwnenwwwnwnwsenwwne",
    "seswswseweneswneseswwwesweseww",
    "senwsesesesenwseswseseseseseeswseesesee",
    "eeeewseeeseee",
    "weeswseswenenwneeeeneeseseeswe",
    "swswwswseswsenwswsewnesenwneswseeswsese",
    "swwwseswwsweswswsewswswswnwnenwswsw",
    "swswswswneseswswneswswswswswseswneswswswsw",
    "wnenweweeeweneeseeeeeswwne",
    "newsweesenewnwesweenesweneneene",
    "swswswswneseswwswswewwnwswwswwswwse",
    "swseseseswsesesewseseeneseswsenwseseswse",
    "senwwnwneesenenwnwswnwnwnesenwnenwnwnw",
    "sweneswewswneeenweewneeeseenwsw",
    "swesenwwswnwswenwnwswswswswswsewneswsw",
    "swsenenwswwnwswseswswswesesesesw",
    "neneenwseswsesesesweseseswseseesenwse",
    "nenwnwnwwnwnwsenenwnenwnwnwnenene",
    "nenenwswnwnenwnwnwnwnwnwnwnwnwneenwnwse",
    "seeenweseseswweeseenesesesweenese",
    "seeeneeesenewneneeneneeenenewnee",
    "nwnenwnewnenenenesenenenenenenenenw",
    "swswseswseswswswnwsenesw",
    "swswsesewseseswswsesesweswwswswswnesenesw",
    "wnewswneswwswswwswswswwesweseseswnw",
    "newsenwnwsenwsesewsewnenwwwwswwsw",
    "nwseewwwsenwwnwnwwwseenw",
    "sweeesweeneneeeenweenweeneee",
    "swnenewwneneneneneneseneneneneseneseswwne",
    "eeswnwewneenweneeswse",
    "seseseseseseswseswswseseesenwsesesenw",
    "seseseseseseswsesesesesesenesese",
    "nenenenwnenenwneenwnenenwnenwneswnesew",
    "nwnesesenenwnwswswnenenwnwwnwwnenenwneene",
    "senwnwnwnwsewwnwnwnwnwnwnwnenwnwwnwnw",
    "wwwwsenwwwewwneswwwwwwww",
    "swswswswnwswnwseswsesweswswswswswnwnweswsw",
    "neeneneneeneseneeneenewenene",
    "seseeseweeseseseeseeese",
    "nenwnwnwsenwswwenwnwnwnenenwnwnenenwnw",
    "nwnwenenwnwnenwnwnenwnwnenew",
    "senwwnwswenwenenewnene",
    "nwnwnwenwswwnwenwwwswnwnwnwenwnwnw",
    "swneswswweswwswswswswsweswwswswwwsw",
    "nwnwnwnwswnenwnwnwnw",
    "newswnenenwsesenenwsewswnesw",
    "neswswnwnesesweswwwnwnwseeswnewnesw",
    "nwenwneeneeneseneseneene",
    "swwswswswsweewswenwswnwswwse",
    "seseseseesweseseeeewnweneseseee",
    "weneeneeeseneeeneeneeswnenwnenene",
    "swnweenwnwnwnenwnwnwnwnwnewnwnwnwnwnw",
    "swwnwwwewswwenwnwwwswwsee",
    "swnwnwseeswswseswsweswswswswsw",
    "nwswwnewewwwwsewwweneswwwsw",
    "seneenewwswswswsenwwswnwswwswwne",
    "swsweswnwswswswswswswswswwneswswswesw",
    "wwswswwwswwwwwnwneswswswsewwnew",
    "nwenweswneswneeswneenwneneneeeee",
    "senewnenenesenenenewneseneswwnenenenenene",
    "wsenwewseneswseswnenwswswnesewneeeese",
    "eenwnwesweswnwsenwwnwnwswnewneswe",
    "wnwsewwnwnwwnewsesewnwwewwswnese",
    "nwswneswswswwswwsesewnwseswwswnwswesw",
    "eweeneeeseeeswneeeseweeeneee",
    "eswswseswseseseswswwnwswswsw",
    "weswwswswseswswnwswnwnwseswnweswee",
    "swswswnwswseswswseseswswswnesw",
    "neneeneneneswneneneneneneneswnewnwswsene",
    "enwswneneneneswnwsweswnesweswenwwsw",
    "nwsenwnwswnwnwnwneenew",
    "weseeswwnweneewsweeswseeneenwe",
    "eswsesenwsweseswswswswswnwenwswwsw",
    "neswnweseneenenwneneswnwnenenwnenenwnene",
    "nwwseseneeseseseswseswwswwneseeesese",
    "nwseswnwnwenwnewnwnwnwnwnwnwnwnwnwnwwnw",
    "sweseeneenesesweneeenweeeenwneew",
    "newnwweswesesenw",
    "eseneesweesweseweeeeeewnesene",
    "nesenwnwnenwnwnwnenwsewsenwnwnwnwnwnene",
    "sewnenenenenweseenwneneswnwne",
    "swswswswswswswwwwe",
    "neneneneneseneenenenenewenee",
    "newseeeeseseesweesewnweeeene",
    "nwswewnenwnwnwnwneswwnwwnwneneenweee",
    "swswnwwswnewwswsewwwesewnwwww",
    "ewwwswwwwswwwwwwneswwseww",
    "nweneseneenewneneenwwwnewnenenwnw",
    "eseeewseswnwneseeneeew",
    "nwseenwnwnwsenwsenwnwnwnwnwnwnwnwwnwwwne",
    "neeeswnweneeswneneeneneeneeeswene",
    "wswesenewswwwswswswnenwswwwswnwsw",
    "sewnwnwwwnwnesenwwnwwsewwwsewnese",
    "eeeeeesweeneeeeseweeneee",
    "wnesewwewwnwnwnwwwwnwwwwnww",
    "wwseswswswwwweswswwsesenwneswwnwsw",
    "senwenenenenwwneneneneswnenesenenenenenew",
    "seswswwseswneseswwswnesweswswswwswsw",
    "wnwnwswwwwswseswwwsewe",
    "nenenenwswnenewnwnenenenenwneneneenesene",
    "eesenweweseeeseeeweeeswsee",
    "swewnweeneeneenese",
    "eeeeesweeneneweeeweeeee",
    "nwsenesenenwwwsewnwneswenwnwnwnwsew",
    "swswswswnwswseeswswsesewsenesw",
    "swsewwswseeswneswsesweswseswswseswswsw",
    "enewwswnwswneeseneneneenenwnese",
    "eneewewseeeeeneeneenewe",
    "neneeseswnwwnwseseeewwsesesesw",
    "senwnesesewseseseseeswsesesesesesesesewse",
    "nenenwnwnenwnesenwwnwnenenenwnwnenw",
    "senwnwswesesewswseswseneswswsw",
    "nenwnwenwnwwwnwnwnwnwnwnwwnwnwnwswsw",
    "neseswswnwseswswswswswsw",
    "seeeseeseseeeseswnwseenesenwsewswse",
    "swswwswswswneswswseswswseswneswseswse",
    "swwwswswwwwnwwewswsweseswnwswsww",
    "wswnwenwwnweneseewnwnwswnwswswwnew",
    "nweswnweeneswneseeeeneswsweswneese",
    "seeeeeeeenwsweeeeesweneee",
    "wseswneswswswewwwwswwwwswswswnwsw",
    "swnesenenenwnwnwnene",
    "nwnwnwnenwnenwnwewseenwnwswnwwnene",
    "sesesenwnwsenwsewnesenwseeenwsw",
    "ewneseswswswswweweswswseswwneswswse",
    "eeseesenweenweeeeeneeewesese",
    "sewnesenewneweneneneweneneeneneswnee",
    "swswswneswswwsewneswnewsesweenwswswswsw",
    "swswnwswweswseseswnwsewnwnwseneesenesesw",
    "nwnwnwnwswnwwnwnwnwnwenenwnwnwnwnwenw",
    "nwswnwwswnwnwnwsewnwwnwnwwnwwwnenwenw",
    "neswwswseswneswsweswnwswwswswswwswswsww",
    "wwneswwsewnewwnwnwwwwwwnwnww",
    "nenwneenenewneswnenenenenenenenenenwe",
    "seswseenwwnewwenenwneswnwseseswswsese",
    "swwesesenwseseneseswswsesenwsesenesese",
    "swsweseseswwsesweneeseswsewnwswnese",
    "nwwenwwswwewwnweswnwsewswwww",
    "nwnwnwnwnwnwnwwnwenwenwwenwnwnwswnw",
    "wwwnwnwsenwsewwswwwnese",
    "senwneneweseseeseesesw",
    "neneeeenenweswenesweeeeeneee",
    "eeeeeeeeesenw",
    "nweenewwsenwwnwnwswnwseenwwwnwnww",
    "neeneseneseneneenenenwwewsw",
    "nweenwewenweeeesesweswnenenenene",
    "enweswnwenwnwwseneswnenwnwwnesenenwnw",
    "wwwwwwwwwswsenenewse",
    "neswwwswswsweswswswwneeseswswnwesw",
    "eseseeneeeseenwsenweesesesweesesw",
    "nenenwnesewsenewnenenwnenenenenesenenesew",
    "swwwswswwswswswseswsewnewwneswswwsw",
    "neeswneeenewenesesweeneenweenee",
    "enwnwewseseeseswswswsenenwswseswsesenwsw",
    "eweeswesweenweseweneneeeesee",
    "weneswswwwnewseeewswseseesewe",
    "nwsewneneneswesewwsenwenwenesewesw",
    "neseswswwsesenwsesesesesene",
    "nwnwwwnenwsewnenwwnwnwswwwnww",
    "wnwnwnwwnesesewnwnwwnwnwnwnwnwnwww",
    "senwswwswnewwnewwwwswwwswnwsweww",
    "wwswnwwswnwseeswswneswseneewswwesw",
    "swsenwswswswenwwswnwsweswswwsweswswswe",
    "eseeeeesenweeenweeeseeeneenw",
    "nwswseswseswswnweswsese",
    "esenwswweeeeswsesenee",
    "neneswneswswwnwsenwswseswswnesweswsewwnw",
    "nwnwsenwnwnwnenwnwnwne",
    "enesesewseseseseseseseneseseseswsesee",
    "neeseseseseseesenwswnwswswwswseseswswsw",
    "wsenenwewswenenwwwenenwnwesewsw",
    "seenewsesesesesesesesenwsenenwseseswsenw",
    "swsenwswseseswseseenesesesesesesesese",
    "neenenenenenenewenewsenenesesenewnene",
    "eneneseeeeswnwneeeeeeweeeenwse",
    "eeeswewsweeeswnenweeneewnwew",
    "wswwswwnewwwswswswsewswwnwwnew",
    "nesenwseseeseeswseswsenewenwseswnewsene",
    "seeesenwswseseenweswnwnesweewnwsw",
    "eneeeeeeeweee",
    "sewewnweneswswnwnenewneswswseesee",
    "seswnenesewwnwnesenwnewnenenenesewnenese",
    "senenenenwnenenenenwnenwnenwne",
    "nwnwwwwwwwwwwnwwenwsesenwnewww",
    "wewnewwwwwwwwwnwseswnwswwse",
    "wnweswswnenwneenenenewnwnenenwewnwsw",
    "wwwswwwwweswnwwswwwenw",
    "nwwnenenwenenwnwswswenenwnweneswnwnwsw",
    "swneseswseseseswsweswnewswnesenenwnesw",
    "swsesenesweswneeeeesweeenwnwesee",
    "wnwwnwsenewwwnwwnwnwnwnwnwww",
    "nwnwwnwnwnwnesenwnwsenwwnwnwnwnwneenw",
    "neseeseesesewswswswseswneswsenw",
    "wnwwnwwenwwwwwwnwnwnewwsenww",
    "wnenenenwnenwnenenenenenenesee",
    "newwsenesewweneseweseswneewwsenw",
    "wswswwseseswswneswnwwnwswseswswwnw",
    "neswnenenenenenenwnenenenesenwseneenenwne",
    "nwwneswnweneneenwnwnwnene",
    "neseswesewnewenew",
    "wwwwwwwnwwsewwwwneww",
    "wnwnenwewenwnwnwnwwsewnwnwwswwwnww",
    "wwweewwewnenewsenwsenesenwswsw",
    "swwswwwwnenweneneswsesenwnenewseseww",
    "ewwnenenenenesewneneneswnenesesenene",
    "swewwswswswseneswswswseneswneswwswswse",
    "enenwswnwwneeswweswwewwwseesenw",
    "swnenwswnwwsewnwswnwewesenenewwswww",
    "neenwnenwnwnwwsewnwnwseswwnwenwnenese",
    "ewesewesenwseseneswneweeswneneesw",
    "neneswenenwweneeeneneneneeneneee",
    "wnwnwnwwwewwneswwwnwewwswnwse",
    "neesweeeneswnwwenewneeseeneseene",
    "eneeeweseewe",
    "sewswenweeneeeesenweeeeeeesw",
    "nenenenwnenwnenenenwwsenenewenenwnenw",
    "sesewwwwnewwswwnwsw",
    "senewneneneneeneneenenenenenenewe",
    "newnwnesenenenenenenenenesenenesenewne",
    "swnwseneseseseseseswswswswneseseswswwse",
    "nwneeenewswsweneeeswweseesesesenw",
    "neeeewwnweseenesewneeneneswnenesw",
    "neswenwseeseeseseneesewsenwnwseee",
    "esweeenwnwsenwswswseswnweneseeesee",
    "seeseseseeswwsewesewnesenenesesee",
    "eseeeweswswseweneseeeenwsesenwse",
    "nenenwneneswnwswnwswsenwnwnenwnwnwnwsew",
    "wseswwwnwwewnwswwswwswwswswsenw",
    "wnwseswwwwwwwsewwwwswne",
    "weswswewnwnwwwwnewwwnwwwswwnw",
    "senenenenwnewnenenene",
    "wneenenwseneswnwnwwsenwnwnwnwnwnwnwnw",
    "nenwsenenewneneesenwswnenwnwwwsenenene",
    "swswweeeeneeneenweeeeewnwe",
    "enewnwewswnwnwwesenwnwnenenenw",
    "eeseswenwseseeeeesese",
    "neeswseswswsesenwswnwseeswnwswseesew",
    "sewwwswwwwwwsewneswwenewnese",
    "swswswswswswwneseswswswswswswwnwsewsw",
    "wwwewnwwwsewnwwwnesewwwswwnw",
    "neeeneeeenenenenenwese",
    "wwsenwnwsewnenewwwsewwwwswwne",
    "eswwnenwseenwnwswnwswnwewsenwwnwwwe",
    "eseeeseeewswneeesenesese",
    "seeseseseseeseseseseseesesenwnweesw",
    "seesesewseswseeseseenwnwsesesesesee",
    "ewwswswnewswnewswswwswwnewwwsew",
    "swswswswseswswswswwswneswswwswwswnesw",
    "nwnesewwwwwwnewwnwwswnwwwnesw",
    "seswnwesesesesenwswseseswswsenw",
    "wswswswnwnenewsesenwewsesewswnwswwww",
    "nwnenwseneswsenwneenewsesenenwnwewnwnwsw",
    "nwseseeeseseseeseseeseee",
    "swnesenwswsenwesewswwseseseswneneeswsw",
    "weswnwnwnenwenwsenwwnwnw",
    "seeeseseeeseeseswwsesesesesenwsese",
    "seswnweswswswswenwseswseneeswswnwseswsw",
    "wwwwwwenwwwwww",
    "eswswsewnwseseswseseswseswwseeswsese",
    "nenwnwnwnwneswswswnenewnenenese",
    "wsewseswwwwnewwwwwneweneww",
    "wseswswenwnwswwseswswneeseewneneenwne",
    "eeswneenesenwsweenwseeswseeesee",
    "swneswswswswewswswswwswwneswswwwnesw",
    "eswwwseeeneneeswnwwnweneneeneesw",
    "neswenenweseswnwneneswsweswnwsewnwne",
    "nenewseseneseswneswnwnwwsewwseswnwe",
    "eeneewwwwnesweeseesewsene",
    "wwwweneneenwwwwsewsewsewwe",
    "neswseseseneeswswswswseswsweswwsewswse",
    "wwswwewewwwwnwswewwwwwww",
    "seseseseneeeseseswswsesesesewnenenwsesw",
    "swnwnwnwwnwnwnwnwnwwnesewnwesewwnw",
    "swsweswswswnwneswswseswswnwswsweswwwsw",
    "nwweeneswneswwwnw",
    "wwnenwwnwsenwnwnwnwww",
    "wwnwwwnwwwwwnwwwweewwwsw",
    "esewwwnwnwnwwwseswnwseseswnewseswwne",
    "nesesesesewseseesesesee",
    "seseseswseweseseswseesesesewswswnwese"
  ]
);