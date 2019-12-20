export {};
const fs = require('fs');

const data: number[] = fs
  .readFileSync('input.txt')
  .toString()
  .split(',')
  .map(Number);

const steps: number[] = [...data];

const getOpcode = (input: number) => input % 100;

const getParameterModes = (input: number) => {
  let param1Mode = 0;
  let param2Mode = 0;

  const inputString = input.toString();
  if (inputString.length > 1) {
    param1Mode = +inputString[inputString.length - 3];
    param2Mode = +inputString[inputString.length - 4];
  }
  return [param1Mode, param2Mode];
};

const add = (n1: number, n2: number) => n1 + n2;
const multiply = (n1: number, n2: number) => n1 * n2;

const runProgram = (steps: number[], systemInputs: number[]) => {
  const instructions = [...steps];
  let stepNumber: number = 0;
  let output: number = 0;
  let systemInputIndex = 0;

  while (stepNumber < instructions.length) {
    const opcode: number = getOpcode(instructions[stepNumber]);
    const [param1Mode, param2Mode]: number[] = getParameterModes(
      instructions[stepNumber]
    );

    let overwriteIndex = instructions[stepNumber + 3];
    const element1 = param1Mode
      ? instructions[stepNumber + 1]
      : instructions[instructions[stepNumber + 1]];
    const element2 = param2Mode
      ? instructions[stepNumber + 2]
      : instructions[instructions[stepNumber + 2]];

    switch (opcode) {
      case 1:
        instructions[overwriteIndex] = add(element1, element2);
        stepNumber += 4;
        break;
      case 2:
        instructions[overwriteIndex] = multiply(element1, element2);
        stepNumber += 4;
        break;
      case 3:
        overwriteIndex = instructions[stepNumber + 1];
        instructions[overwriteIndex] = systemInputs[systemInputIndex];
        systemInputIndex += 1;
        stepNumber += 2;
        break;
      case 4:
        output = element1;
        stepNumber += 2;
        break;
      case 5:
        element1 !== 0 ? (stepNumber = element2) : (stepNumber += 3);
        break;
      case 6:
        element1 === 0 ? (stepNumber = element2) : (stepNumber += 3);
        break;
      case 7:
        instructions[overwriteIndex] = element1 < element2 ? 1 : 0;
        stepNumber += 4;
        break;
      case 8:
        instructions[overwriteIndex] = element1 === element2 ? 1 : 0;
        stepNumber += 4;
        break;
      case 99:
        return output;
    }
  }
};

const initialPhaseSetting = [0, 1, 2, 3, 4];

const swap = (array: number[], indexA: number, indexB: number) => {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
  return array;
};

const getPermutations = (inputArray: number[]): number[][] => {
  const result = [];

  const pushResult = (permutation: number[]) => {
    result.push(permutation);
  };

  const recursive = (array: number[], length: number) => {
    if (length === 1) {
      pushResult([...array]);
    } else {
      for (let i = 1; i <= length; i++) {
        recursive(array, length - 1);

        if (length % 2) {
          swap(array, 0, length - 1);
        } else {
          swap(array, i - 1, length - 1);
        }
      }
    }
  };

  recursive(inputArray, inputArray.length);
  return result;
};

let maxOutput = 0;

const permutations = getPermutations(initialPhaseSetting);

const initialInputValue = 0;

permutations.forEach((phaseSetting: number[]) => {
  const output = phaseSetting.reduce(
    (inputSignal: number, setting: number) =>
      runProgram(steps, [setting, inputSignal]),
    initialInputValue
  );
  if (output > maxOutput) {
    maxOutput = output;
  }
});

console.log(`Part 1: ${maxOutput}`);
