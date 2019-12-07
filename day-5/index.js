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
const runProgram = (instructions, systemID) => {
    let stepNumber = 0;
    let output = 0;
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
                instructions[overwriteIndex] = systemID;
                stepNumber += 2;
                break;
            case 4:
                output = element1;
                stepNumber += 2;
                break;
            case 99:
                return output;
        }
    }
};
const part1 = runProgram(steps, 1);
console.log(`Part 1: ${part1}`);
