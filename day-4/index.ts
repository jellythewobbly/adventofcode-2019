const fs = require('fs');

const data: number[] = fs
  .readFileSync('input.txt', (err, data) => {
    if (err) {
      throw err;
    }
  })
  .toString()
  .split('-')
  .map(Number);

const [low, high] = data;

const hasAdjacentDigits = (n: number) => {
  const stringNum = n.toString();
  for (let i = 1; i < stringNum.length; i++) {
    if (stringNum[i] === stringNum[i - 1]) {
      return true;
    }
  }
  return false;
};

const digitsNeverDecrease = (n: number) => {
  const stringNum = n.toString();
  for (let i = 1; i < stringNum.length; i++) {
    if (stringNum[i] < stringNum[i - 1]) {
      return false;
    }
  }
  return true;
};

let differentPasswords = 0;

for (let currentNumber = low; currentNumber <= high; currentNumber++) {
  if (hasAdjacentDigits(currentNumber) && digitsNeverDecrease(currentNumber)) {
    differentPasswords += 1;
  }
}

console.log(`Part 1: ${differentPasswords}`);
