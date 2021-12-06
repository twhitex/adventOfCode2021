"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var log = console.log;
log("day one");
var splitInput = input_1.input.split("\n").map(function (item) { return Number(item); });
var answer = 0;
splitInput.forEach(function (row, i) {
    if (answer)
        return;
    splitInput.forEach(function (item) {
        if (row + item == 2020) {
            answer = row * item;
            return;
        }
    });
});
log("part one", answer);
answer = null;
splitInput.forEach(function (r1, i) {
    if (answer)
        return;
    splitInput.forEach(function (r2) {
        splitInput.forEach(function (r3) {
            if (r1 + r2 + r3 == 2020) {
                answer = r1 * r2 * r3;
                return;
            }
        });
    });
});
log("part two", answer);
