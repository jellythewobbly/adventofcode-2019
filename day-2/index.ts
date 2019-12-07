export {};
const fs = require('fs');

const add = (n1: number, n2: number) => n1 + n2;
const multiply = (n1: number, n2: number) => n1 * n2;

const data: number[] = fs
  .readFileSync('input.txt')
  .toString()
  .split(',')
  .map(Number);

const steps: number[] = [...data];

steps[1] = 12;
steps[2] = 2;

const runProgram = (instructions: number[]) => {
  let stepNumber = 0;

  while (instructions[stepNumber] !== 99) {
    const opcode = instructions[stepNumber];

    const element1 = instructions[instructions[stepNumber + 1]];
    const element2 = instructions[instructions[stepNumber + 2]];
    const overwriteIndex = instructions[stepNumber + 3];

    if (opcode === 1) {
      instructions[overwriteIndex] = add(element1, element2);
    } else if (opcode === 2) {
      instructions[overwriteIndex] = multiply(element1, element2);
    }

    stepNumber += 4;
  }
  return instructions[0];
};

const part1Answer = runProgram(steps);

console.log(`Part 1: ${part1Answer}`);

const steps2: number[] = [...data];

const findNounVerb = (instructions: number[], targetOutput: number) => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let cloneInstructions = [...instructions];
      let noun = i;
      let verb = j;

      cloneInstructions[1] = noun;
      cloneInstructions[2] = verb;

      if (runProgram(cloneInstructions) === targetOutput) {
        return { noun, verb };
      }
    }
  }
};

const { noun, verb } = findNounVerb(steps2, 19690720)!;

const part2Answer = 100 * noun + verb;

console.log(`Part 2: ${part2Answer}`);
