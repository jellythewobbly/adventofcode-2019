export {};
const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n');

const map = {};

data.forEach(element => {
  if (element) {
    const [parent, child] = element.split(')');
    map[child] = parent;
  }
});

const getOrbits = (key: string) => {
  if (typeof map[key] === 'number') {
    return map[key];
  }
  if (map[key]) {
    const res = 1 + getOrbits(map[key]);
    map[key] = res;
    return res;
  }
  return 0;
};

const part1 = Object.keys(map).reduce(
  (sum: number, key: string) => sum + getOrbits(key),
  0
);

console.log(`Part 1: ${part1}`);
