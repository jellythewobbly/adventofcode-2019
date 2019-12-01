const fs = require('fs');

const data = fs
  .readFileSync('input.txt', (err, data) => {
    if (err) {
      throw err;
    }
  })
  .toString()
  .split('\n')
  .map(Number);

const calculateFuel = (mass: number) => ((mass / 3) | 0) - 2;

const totalFuel = data.reduce(
  (total: number, current: number) => total + calculateFuel(current),
  0
);

console.log(totalFuel);
