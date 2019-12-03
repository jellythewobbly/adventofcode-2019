var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var fs = require('fs');
var add = function (n1, n2) { return n1 + n2; };
var multiply = function (n1, n2) { return n1 * n2; };
var data = fs
    .readFileSync('input.txt', function (err, data) {
    if (err) {
        throw err;
    }
})
    .toString()
    .split(',')
    .map(Number);
var steps = __spreadArrays(data);
steps[1] = 12;
steps[2] = 2;
var runProgram = function (instructions) {
    var stepNumber = 0;
    while (instructions[stepNumber] !== 99) {
        var opcode = instructions[stepNumber];
        var element1 = instructions[instructions[stepNumber + 1]];
        var element2 = instructions[instructions[stepNumber + 2]];
        var overwriteIndex = instructions[stepNumber + 3];
        if (opcode === 1) {
            instructions[overwriteIndex] = add(element1, element2);
        }
        else if (opcode === 2) {
            instructions[overwriteIndex] = multiply(element1, element2);
        }
        stepNumber += 4;
    }
    return instructions[0];
};
var part1Answer = runProgram(steps);
console.log("Part 1: " + part1Answer);
var steps2 = __spreadArrays(data);
var findNounVerb = function (instructions, targetOutput) {
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            var cloneInstructions = __spreadArrays(instructions);
            var noun_1 = i;
            var verb_1 = j;
            cloneInstructions[1] = noun_1;
            cloneInstructions[2] = verb_1;
            if (runProgram(cloneInstructions) === targetOutput) {
                return { noun: noun_1, verb: verb_1 };
            }
        }
    }
};
var _a = findNounVerb(steps2, 19690720), noun = _a.noun, verb = _a.verb;
var part2Answer = 100 * noun + verb;
console.log("Part 2: " + part2Answer);
