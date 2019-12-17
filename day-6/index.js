"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const data = fs
    .readFileSync('input.txt')
    .toString()
    .split('\n');
const map = {};
data.forEach(element => {
    if (element) {
        const [parent, child] = element.split(')');
        map[child] = { parent };
    }
});
const getOrbits = (key) => {
    if (key in map) {
        if (map[key].orbitCount) {
            return map[key].orbitCount;
        }
        const orbitCount = 1 + getOrbits(map[key].parent);
        map[key].orbitCount = orbitCount;
        return orbitCount;
    }
    return 0;
};
const part1 = Object.keys(map).reduce((sum, key) => sum + getOrbits(key), 0);
console.log(`Part 1: ${part1}`);
const santa = 'SAN';
const you = 'YOU';
const santaOrbits = getOrbits(santa);
const youOrbits = getOrbits(you);
const further = santaOrbits > youOrbits ? santa : you;
const nearer = santaOrbits < youOrbits ? santa : you;
let diff = Math.abs(santaOrbits - youOrbits);
const getParentNode = (node) => map[node].parent;
const furtherPointer = { current: getParentNode(further) };
const nearerPointer = { current: getParentNode(nearer) };
let orbitalTransfers = 0;
while (furtherPointer.current !== nearerPointer.current) {
    if (diff > 0) {
        furtherPointer.current = getParentNode(furtherPointer.current);
        diff -= 1;
        orbitalTransfers += 1;
    }
    else {
        furtherPointer.current = getParentNode(furtherPointer.current);
        nearerPointer.current = getParentNode(nearerPointer.current);
        orbitalTransfers += 2;
    }
}
console.log(`Part 2: ${orbitalTransfers}`);
