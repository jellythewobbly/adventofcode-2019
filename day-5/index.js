var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var fs = require('fs');
var data = fs
    .readFileSync('input.txt')
    .toString()
    .split(',')
    .map(Number);
var steps = __spreadArrays(data);
var getOpcode = function (input) { return input % 100; };
var getParameterModes = function (input) {
    var param1Mode = 0;
    var param2Mode = 0;
    var inputString = input.toString();
    if (inputString.length > 1) {
        param1Mode = +inputString[inputString.length - 3];
        param2Mode = +inputString[inputString.length - 4];
    }
    return [param1Mode, param2Mode];
};
var add = function (n1, n2) { return n1 + n2; };
var multiply = function (n1, n2) { return n1 * n2; };
var runProgram = function (instructions, systemID) {
    var stepNumber = 0;
    var output;
    while (stepNumber < instructions.length) {
        var opcode = getOpcode(instructions[stepNumber]);
        var _a = getParameterModes(instructions[stepNumber]), param1Mode = _a[0], param2Mode = _a[1];
        var overwriteIndex = instructions[stepNumber + 3];
        var element1 = param1Mode
            ? instructions[stepNumber + 1]
            : instructions[instructions[stepNumber + 1]];
        var element2 = param2Mode
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
var part1 = runProgram(steps, 1);
console.log("Part 1: " + part1);
