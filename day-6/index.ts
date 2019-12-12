export {};
const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n');

const map = {};

data.forEach(element => {
  const [parent, child] = element.split(')');
  map[child] = parent;
});

const getOrbits = (key: string) => (map[key] ? 1 + getOrbits(map[key]) : 0);

const part1 = Object.keys(map).reduce(
  (sum: number, key: string) => sum + getOrbits(key),
  0
);

console.log(`Part 1: ${part1}`);
