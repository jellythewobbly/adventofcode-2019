var fs = require('fs');
var add = function (n1, n2) { return n1 + n2; };
var multiply = function (n1, n2) { return n1 * n2; };
var data = fs
    .readFileSync('input.txt', function (err, data) {
    if (err) {
        throw err;
    }
})
    .toString()
    .split(',')
    .map(Number);
var steps = data;
steps[1] = 12;
steps[2] = 2;
var stepNumber = 0;
while (steps[stepNumber] !== 99) {
    var input = steps[stepNumber];
    var element1 = steps[steps[stepNumber + 1]];
    var element2 = steps[steps[stepNumber + 2]];
    var overwriteIndex = steps[stepNumber + 3];
    if (input === 1) {
        steps[overwriteIndex] = add(element1, element2);
    }
    else if (input === 2) {
        steps[overwriteIndex] = multiply(element1, element2);
    }
    stepNumber += 4;
}
var part1Answer = steps[0];
console.log("Part 1: " + part1Answer);
