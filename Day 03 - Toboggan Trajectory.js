function day03(input) {
  var x = 0;
  var treeCount1 = 0, treeCount2 = 0, treeCount3 = 0, treeCount4 = 0, treeCount5 = 0;
  for (var i = 1; i < input.length; i++) {
    if (input[i][(i*1) % input[0].length] === "#") {
      treeCount1++;
    }
    if (input[i][(i*3) % input[0].length] === "#") {
      treeCount2++;
    }
    if (input[i][(i*5) % input[0].length] === "#") {
      treeCount3++;
    }
    if (input[i][(i*7) % input[0].length] === "#") {
      treeCount4++;
    }
  }
  for (var i = 2; i < input.length; i += 2) {
    if (input[i][Math.floor(i*0.5) % input[0].length] === "#") {
      treeCount5++;
    }
  }
  console.log(treeCount1);
  console.log(treeCount2);
  console.log(treeCount3);
  console.log(treeCount4);
  console.log(treeCount5);
}

day03([
"..##.......",
"#...#...#..",
".#....#..#.",
"..#.#...#.#",
".#...##..#.",
"..#.##.....",
".#.#.#....#",
".#........#",
"#.##...#...",
"#...##....#",
".#..#...#.#"
]);

day03([
"............#....#.............",
"...........##....#......#..#..#",
"......#.......#......#.........",
"..#.#....#....#.............##.",
"..#........####....#...#.......",
"..##.....#.#.#..#.........#....",
"...#.#..#..#....#..#..#........",
"#.......#.........#....##.###..",
"......##..#.#...#.......#.#....",
"................##.........#.##",
"..##..........#...#.........#.#",
"..........#...##...............",
"#...#......#..#.#..#...##..#...",
"..##....#.......#......#..#....",
"....#......#......#....#.......",
".........#.....#..#............",
".#...#.#.........#........#....",
"#..........####.....#..........",
"......##.....#....#..#........#",
"#......#......#...........#....",
"....#.........#....#...#..#..#.",
".#........#......#.#.....#.....",
"..#.#.#..........#....#.......#",
"......#.#........##....##....##",
".....#.#..#...#................",
"......#......##...............#",
"..#..##.............#...##.....",
"......##......##..#......#.....",
"....#.............#..##.....##.",
"........#...............##.....",
"..#......#.##..#...#....#...#..",
"#......#.......#.............#.",
".....#....##..............#....",
"#.#.........#....#..##....#....",
".#...#...#....#.#............#.",
"...#...#.#..##.##.......##.....",
"......#..#....##..#.#..#..#....",
".......##..#..#......#..#.....#",
".##..#......#..........#....#..",
".....#................#..#....#",
"........#..#....#.......#....#.",
"..#......#.......#......#....#.",
"....#...#.##........##....#....",
".....#........#...........#....",
"...#....##..........#..#...#.#.",
"...#.......#......#...##...#...",
".#.....#........#........#.#..#",
".#.........#..##.....#.......#.",
"....#..#....#.......#......#...",
".#.#...##..##................##",
"......#.#...#.......#....#....#",
"........#....#..#.....#......#.",
".......#..........#......#.....",
"...............................",
"..#..#####..#..#..........#.#..",
".....#....##................#.#",
".................##............",
".#...#...#..#...........#...##.",
"..#..#.#...........#.....##....",
".#.......#.....#..##..#.#....#.",
"..........#.#......##...##.....",
"........##..#......##...#......",
"#......................#.......",
"............#.....#....#.#...#.",
"#......#..........##..#........",
".........#.......#...#.#.......",
"...........##....#........#....",
"#........#.....#...#........##.",
".#......##......#.##.......#..#",
".....#......#.#......#.......#.",
".....#.#.........#.............",
"...........#..#....#.....#.#...",
"...#............#...#..........",
"..#..#...#.....................",
"......#..#...#....#............",
".#.#.#........#..#...#.........",
"..........#........#..#........",
"..............#...#....#.......",
"..#....#....##.......#...#.##..",
".#.........#...#......#........",
"..#......#...#.........##.#...#",
"...#.....#...#..#.............#",
".##........#.#.#.............#.",
"..#.............#..#.#...#....#",
"#...#.........#......#......#..",
".......##..#.#..........#...#..",
".......#.............#..#.#....",
".#..#....#.#...................",
"....##...#..#....#..#..........",
"....#.#............#...........",
"###........##..#.#..#..........",
".#.#.#.......#...........#..#.#",
"..........##..#.............#..",
".#...........#......#.#..#..##.",
"...###......#.##........#.....#",
"....#..#..#...#................",
"...#.....#........#............",
"....#...#...#..#..##.##.......#",
"#.......#......#....#.......#..",
"#.............#...#............",
"##......#..#...#....##.#...#...",
".##....................#....#..",
"..#.....#....#.#....#......#...",
".......#..#..#............#...#",
".#.....#.......#..#..#..#......",
"......##.......................",
"#..#...#.#.#....#.....#..#.....",
"...................#...#...#...",
"........#....##..#....#........",
"##......#.#......##.###........",
".........#...##................",
".......#...#...#.......##......",
"....#.......#......#.........##",
"....#....#.#..#.....#..........",
"...........#.......#........#..",
"..#.........###.#........#.....",
".......#...........#.#.....##..",
"..#...#..#..........#..........",
"..........#.#....#.............",
".##....#........##.............",
".............#.#####........#.#",
".................##...#........",
"##...#.#.......##........#.....",
".#...#...#..#..#....#....#.....",
"..#...#........#..#............",
"##...#.#........#......##.#..##",
".##......#..............##.#..#",
".........#...#............#...#",
"....#..#....#...........#......",
"........#..#....#...##...#.....",
"..#..............#...#.#.....#.",
".#.......#.#.....#..###.......#",
"...................#.......#...",
"........##.....#..#.......##...",
".....#....................#...#",
"...#.#....#............#.#.....",
"#.......#.......#....#.........",
"..#...............#............",
"##...#...#...#..............#..",
"...#..........#..#....##.......",
"#............##.##......#.#.#..",
".#...........#.........#....##.",
"..##....##.#....#.#.#.##...##.#",
"........#.#.#.............#....",
".#...........#....##...#...#.#.",
".##...#.................#......",
"....#.#..#....................#",
".##......#........#..#.........",
"...#...............#...........",
".#.#..##..##.#........#........",
"...........#....#.#.#......#...",
"...................#........#.#",
"..#............#...#.#........#",
"....#....#.#.##......#...#.....",
"..................#............",
"..........................#....",
"........#......................",
"......#.#...#.#..##......#.#.#.",
".........#...#..#..............",
"..#.......#..........##..#.....",
".........#............#........",
"......#..#..#...###....#....#..",
"#..#..............##.###..##..#",
".#..................#.....#...#",
"........#........#........#....",
".........#........#.##......#..",
"..#.....#.#..###...#....#......",
"..#................##....#.....",
"..#.#....##.....#......##...#..",
"...#.......#........##.........",
"#........#...#.#..........##..#",
"................#...#.#.....#..",
".........#..#..#.#..#.#...#....",
"##....#...##.........#.#...#.##",
"....#..#.....##.....#.....##...",
"................#............#.",
"..#..#...#.....#......#.....##.",
"....#.......#...#...#...#..#...",
"....#..##....#.###.#...#..#....",
"#..##.....#.....#.##..##...##.#",
".............###..........#....",
"..................#.....###....",
"..........#....#...#......#....",
"...#..##.......#......#.#...#..",
"..#.......................##.#.",
"..#..#..#....#......#...#...##.",
"#.............#................",
"..........#.#.#.........#.#....",
".....##..#......##.#...........",
".#.#.#.#....#.#...#.....#.#...#",
"......#.....##..............##.",
"#..#.......##..##..............",
"#..#..#................###.....",
".....#......#.........#........",
"#...........#........#.#.......",
"#........#.#...#....#....###..#",
"###..#.#...........#.##.....#.#",
"..#..........#..#............#.",
"...#....#.......#..#.....###...",
".#....#.##.#..###..............",
".....#.##.##.......###.##...#.#",
"..#..##.......###..............",
".#.........###..#..............",
"..................###.....#..#.",
"#....#....#.........#.....#....",
".........#.#..#....#.....#.....",
"....##.......##.......#.#......",
".....#...#.##.....#............",
"....#.#.#.......#..............",
".##..#.#..#.......##...........",
"....#....##..#.....##.......#.#",
".....##....#..#.#........#.....",
"........#.#.#....#....##...#..#",
"..#......#.#.#..#.##....#.#.#..",
"..#...#........#..#..........#.",
".........#...................#.",
"........#.....##..#....#....#..",
"#..............#..........#....",
"#........#.#...........#.#.....",
"..#......................#.#..#",
".........#.#.....#.#..........#",
"......#....#.#.##........#.....",
".#....##......##..#...#.......#",
"..#........#...#.##....#..#.#..",
".......#.....#..........#.....#",
".........#.#..#.........#....#.",
"..........#.##.........##..#...",
"......#.#..#.....#.#..........#",
"......#.#.#..#..#.#............",
"...##.#..#..............#....#.",
"#..........#...................",
".#....#..#.#.......#........#..",
"...#...#......#....#......#....",
"..#.#.......#.......#.......#.#",
"...#.#...#........#.....#......",
"#.......#..#...................",
"#..#..#.............#..#..#..#.",
"#.......................#....##",
".#.........#....#....#.........",
"...............#...#..#....#..#",
"#.....#.#...#.#.....#..........",
"....##.#..#...#.#....###...#.#.",
".................#....#........",
"####.......##...##.......#.##..",
"#..#....#....##............#...",
"..##......#..#........#........",
"....#..#..........#......#...##",
"..#.#.............#...........#",
"#...............#...#.......#.#",
"#..#.........#.##.#.......#...#",
"......#.....#.............#...#",
"......#.##.........##...#......",
"..#......##.#........#.......#.",
"#..#.........#.##..............",
"..#....#...#...#..#.....#.#....",
"................#.......#......",
"#.....#..............##....#.##",
"##.....#...#.#.....#..##...#...",
"#.#............##..........#..#",
"..#.##......#..#....#..........",
"....##.#....#.......##.....#...",
"......#.#....###...#...........",
"..................#......#....#",
"..............##...............",
"......#..#....#.....#..........",
".......#........#...#..........",
"..#......#......##..#.##..#....",
"..#.#...#...............#......",
"....#.#.............#.#......#.",
"....#.#.....#......#..#.......#",
"........................#..#...",
".................#...........#.",
"#......#......#.#.#.....##.....",
"..#....##...#.....##.#.....#..#",
"....#.........#....#.##.#.#....",
"..#....###.....................",
".....#.#....#......#....##....#",
"#.......#...#......##.......#..",
"#....#.........##.....#........",
"#.....#...........#..#.....#...",
".................#.....#..##..#",
"..#...#......####...##.........",
"...............................",
"#........#.....#...............",
".#.........#....#.#......##....",
"...#..........#.........#.#.#.#",
"......##......#....###........#",
".....................#.#.#.....",
"......#..#..#.......#...#......",
"...##.#.............#.#.......#",
"..#.#...#..#....#.....#.....#..",
"..#..#.....................#..#",
"........#....#..........#..#...",
"#.##....#..#.#..#............#.",
"..............###.............#",
".#.#..........#.#....#...#....#",
"....#..........#.#..#......#...",
".........##.#...#..............",
"..................#.....#.#....",
".#....#.......#.##.#.........#.",
".##..#...#......#..#...........",
".#.........#..........#.#......",
"#.#......#.#.#.#.......#...#.#.",
".......#....#.#......#......#..",
"...#..#....#.#..#..##...##.....",
"#.#.#.......#....#.........##..",
"#..#....#........###....#.#....",
"....#..#.........#....#...#....",
"...#.#.#.#..#..##.....#.##.....",
".......#.......#...............",
"#.#.#......##....#.............",
"...#.##........#.....#...##.#..",
"...#.#.###..........#.......#..",
".....#...#.......#.........#...",
"............#..#...#..##.......",
"...#....#..##.##..........#.##.",
"..................#........#...",
"....#.##.#.##........#.#.......",
".#...........##.....##.......#.",
"#...#.........#.....##.........",
"#..#....#.#.........#..........",
"..#......#.#.#......#.....#..#.",
"..##......#..............#....."
]);