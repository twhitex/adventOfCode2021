"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
console.log("day one");
//part one
var input = input_1.dayOneInput.split('\n').map(function (item) { return Number(item); });
var prev = 0;
var partOneAsnwer = 0;
input.forEach(function (item, i) {
    if (i != 0) {
        if (item > prev)
            partOneAsnwer++;
    }
    prev = item;
});
console.log("part one: ".concat(partOneAsnwer));
//part two
prev = 0;
var partTwoAnswer = 0;
var dict = {};
input.forEach(function (item, i) {
    dict[i] = [item, input[i + 1], input[i + 2]];
});
Object.keys(dict).map(function (item, i) {
    var sumOfCurrent = (0, helper_1.sumOfNumArray)(dict[item]);
    if (i != 0) {
        if (sumOfCurrent > prev)
            partTwoAnswer++;
    }
    prev = sumOfCurrent;
});
console.log("part two: ".concat(partTwoAnswer));
