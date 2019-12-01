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
var totalFuel = data.reduce(function (total, current) { return total + calculateFuel(current); }, 0);
console.log("Part 1: " + totalFuel);
var newTotalFuel = data.reduce(function (total, current) {
    var fuelRequired = calculateFuel(current);
    var additionalFuel = calculateFuel(fuelRequired);
    while (additionalFuel > 0) {
        fuelRequired += additionalFuel;
        additionalFuel = calculateFuel(additionalFuel);
    }
    return total + fuelRequired;
}, 0);
console.log("Part 2: " + newTotalFuel);
