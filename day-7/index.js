"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const data = fs
    .readFileSync('input.txt')
    .toString()
    .split(',')
    .map(Number);
const steps = [...data];
const getOpcode = (input) => input % 100;
const getParameterModes = (input) => {
    let param1Mode = 0;
    let param2Mode = 0;
    const inputString = input.toString();
    if (inputString.length > 1) {
        param1Mode = +inputString[inputString.length - 3];
        param2Mode = +inputString[inputString.length - 4];
    }
    return [param1Mode, param2Mode];
};
const add = (n1, n2) => n1 + n2;
const multiply = (n1, n2) => n1 * n2;
const runProgram = (steps, systemInputs) => {
    const instructions = [...steps];
    let stepNumber = 0;
    let output = 0;
    let systemInputIndex = 0;
    while (stepNumber < instructions.length) {
        const opcode = getOpcode(instructions[stepNumber]);
        const [param1Mode, param2Mode] = getParameterModes(instructions[stepNumber]);
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
const swap = (array, indexA, indexB) => {
    const temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
    return array;
};
const getPermutations = (inputArray) => {
    const result = [];
    const pushResult = (permutation) => {
        result.push(permutation);
    };
    const recursive = (array, length) => {
        if (length === 1) {
            pushResult([...array]);
        }
        else {
            for (let i = 1; i <= length; i++) {
                recursive(array, length - 1);
                if (length % 2) {
                    swap(array, 0, length - 1);
                }
                else {
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
permutations.forEach((phaseSetting) => {
    const output = phaseSetting.reduce((inputSignal, setting) => runProgram(steps, [setting, inputSignal]), initialInputValue);
    if (output > maxOutput) {
        maxOutput = output;
    }
});
console.log(`Part 1: ${maxOutput}`);
