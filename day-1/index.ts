const fs = require('fs');

const data: number[] = fs
  .readFileSync('input.txt', (err, data) => {
    if (err) {
      throw err;
    }
  })
  .toString()
  .split('\n')
  .map(Number);

const calculateFuel = (mass: number) => ((mass / 3) | 0) - 2;

const totalFuel: number = data.reduce(
  (total: number, current: number) => total + calculateFuel(current),
  0
);

console.log(`Part 1: ${totalFuel}`);

const newTotalFuel: number = data.reduce((total: number, current: number) => {
  let fuelRequired = calculateFuel(current);
  let additionalFuel = calculateFuel(fuelRequired);

  while (additionalFuel > 0) {
    fuelRequired += additionalFuel;
    additionalFuel = calculateFuel(additionalFuel);
  }

  return total + fuelRequired;
}, 0);

console.log(`Part 2: ${newTotalFuel}`);
