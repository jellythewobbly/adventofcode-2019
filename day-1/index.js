"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const data = fs
    .readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(Number);
const calculateFuel = (mass) => ((mass / 3) | 0) - 2;
const totalFuel = data.reduce((total, current) => total + calculateFuel(current), 0);
console.log(`Part 1: ${totalFuel}`);
const newTotalFuel = data.reduce((total, current) => {
    let fuelRequired = calculateFuel(current);
    let additionalFuel = calculateFuel(fuelRequired);
    while (additionalFuel > 0) {
        fuelRequired += additionalFuel;
        additionalFuel = calculateFuel(additionalFuel);
    }
    return total + fuelRequired;
}, 0);
console.log(`Part 2: ${newTotalFuel}`);
