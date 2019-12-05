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
