var fs = require('fs');
var data = fs
    .readFileSync('input.txt', function (err, data) {
    if (err) {
        throw err;
    }
})
    .toString()
    .split('-')
    .map(Number);
var low = data[0], high = data[1];
var hasAdjacentDigits = function (n) {
    var stringNum = n.toString();
    for (var i = 1; i < stringNum.length; i++) {
        if (stringNum[i] === stringNum[i - 1]) {
            return true;
        }
    }
    return false;
};
var digitsNeverDecrease = function (n) {
    var stringNum = n.toString();
    for (var i = 1; i < stringNum.length; i++) {
        if (stringNum[i] < stringNum[i - 1]) {
            return false;
        }
    }
    return true;
};
var differentPasswords = 0;
for (var currentNumber = low; currentNumber <= high; currentNumber++) {
    if (hasAdjacentDigits(currentNumber) && digitsNeverDecrease(currentNumber)) {
        differentPasswords += 1;
    }
}
console.log("Part 1: " + differentPasswords);
var twoAdjacentDigits = function (n) {
    var stringNum = n.toString();
    var adjacentCount = 1;
    for (var i = 1; i < stringNum.length; i++) {
        if (stringNum[i] !== stringNum[i - 1] && adjacentCount === 2) {
            return true;
        }
        if (stringNum[i] === stringNum[i - 1]) {
            adjacentCount += 1;
        }
        else {
            adjacentCount = 1;
        }
    }
    return adjacentCount === 2;
};
var newDifferentPasswords = 0;
for (var currentNumber = low; currentNumber <= high; currentNumber++) {
    if (twoAdjacentDigits(currentNumber) && digitsNeverDecrease(currentNumber)) {
        newDifferentPasswords += 1;
    }
}
console.log("Part 2: " + newDifferentPasswords);
