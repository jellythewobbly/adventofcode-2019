const fs = require('fs');

const add = (n1: number, n2: number) => n1 + n2;
const multiply = (n1: number, n2: number) => n1 * n2;

const data: number[] = fs
  .readFileSync('input.txt', (err, data) => {
    if (err) {
      throw err;
    }
  })
  .toString()
  .split(',')
  .map(Number);

const steps: number[] = data;

steps[1] = 12;
steps[2] = 2;

let stepNumber = 0;

while (steps[stepNumber] !== 99) {
  const input = steps[stepNumber];

  const element1 = steps[steps[stepNumber + 1]];
  const element2 = steps[steps[stepNumber + 2]];
  const overwriteIndex = steps[stepNumber + 3];

  if (input === 1) {
    steps[overwriteIndex] = add(element1, element2);
  } else if (input === 2) {
    steps[overwriteIndex] = multiply(element1, element2);
  }

  stepNumber += 4;
}

const part1Answer = steps[0];

console.log(`Part 1: ${part1Answer}`);
