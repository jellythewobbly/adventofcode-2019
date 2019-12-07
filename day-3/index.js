var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .split('\n');
var wire1 = data[0].split(',');
var wire2 = data[1].split(',');
var MAP_X = { L: -1, R: 1, U: 0, D: 0 };
var MAP_Y = { L: 0, R: 0, U: 1, D: -1 };
var getPoints = function (wirePath) {
    var x = 0;
    var y = 0;
    var length = 0;
    var res = {};
    for (var _i = 0, wirePath_1 = wirePath; _i < wirePath_1.length; _i++) {
        var path = wirePath_1[_i];
        var direction = path[0];
        var distance = +path.slice(1);
        for (var i = 0; i < distance; i++) {
            x += MAP_X[direction];
            y += MAP_Y[direction];
            length += 1;
            if (!res[x + "," + y]) {
                res[x + "," + y] = length;
            }
        }
    }
    return res;
};
var points1 = getPoints(wire1);
var points2 = getPoints(wire2);
var both = {};
for (var i in points1) {
    if (points2[i]) {
        both[i] = true;
    }
}
var part1 = Math.min.apply(Math, Object.keys(both).map(function (point) {
    return point.split(',').reduce(function (acc, cur) { return acc + Math.abs(+cur); }, 0);
}));
console.log("Part 1: " + part1);
var part2 = Math.min.apply(Math, Object.keys(both).map(function (point) { return points1[point] + points2[point]; }));
console.log("Part 2: " + part2);
