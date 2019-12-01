var fs = require('fs');
var data = fs
    .readFileSync('input.txt', function (err, data) {
    if (err) {
        throw err;
    }
})
    .toString()
    .split('\n')
    .map(Number);
var calculateFuel = function (mass) { return ((mass / 3) | 0) - 2; };
var totalFuel = data.reduce(function (ans, currentNum) { return ans + calculateFuel(currentNum); }, 0);
console.log(totalFuel);
