export {};
const fs = require('fs');

const data: string[] = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n');

const wire1: string[] = data[0].split(',');
const wire2: string[] = data[1].split(',');

const MAP_X = { L: -1, R: 1, U: 0, D: 0 };
const MAP_Y = { L: 0, R: 0, U: 1, D: -1 };

const getPoints = (wirePath: string[]) => {
  let x = 0;
  let y = 0;
  let length = 0;

  const res = {};

  for (const path of wirePath) {
    const direction = path[0];
    const distance = +path.slice(1);

    for (let i = 0; i < distance; i++) {
      x += MAP_X[direction];
      y += MAP_Y[direction];
      length += 1;

      if (!res[`${x},${y}`]) {
        res[`${x},${y}`] = length;
      }
    }
  }
  return res;
};

const points1 = getPoints(wire1);
const points2 = getPoints(wire2);

const both = {};

for (const i in points1) {
  if (points2[i]) {
    both[i] = true;
  }
}

const part1: number = Math.min(
  ...Object.keys(both).map(point =>
    point.split(',').reduce((acc, cur) => acc + Math.abs(+cur), 0)
  )
);

console.log(`Part 1: ${part1}`);

const part2: number = Math.min(
  ...Object.keys(both).map(point => points1[point] + points2[point])
);

console.log(`Part 2: ${part2}`);
